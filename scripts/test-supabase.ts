/**
 * Supabase Connection Test Script
 *
 * Run this to verify your Supabase setup:
 * npm run test:supabase
 */

// IMPORTANT: Load environment variables FIRST before any imports
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

// Now import Supabase after env vars are loaded
import { createClient } from '@supabase/supabase-js';

const STORAGE_BUCKET = 'consultation-photos';

// Get env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function testDatabaseConnection() {
  console.log('\n🔍 Testing Database Connection...\n');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test consultations table
    const { data: consultations, error: consultationsError } = await supabase
      .from('consultations')
      .select('count');

    if (consultationsError) {
      console.error('❌ Consultations table error:', consultationsError.message);
      return false;
    }
    console.log('✅ Consultations table: Connected');

    // Test paid_reports table
    const { data: reports, error: reportsError } = await supabase
      .from('paid_reports')
      .select('count');

    if (reportsError) {
      console.error('❌ Paid reports table error:', reportsError.message);
      return false;
    }
    console.log('✅ Paid reports table: Connected');

    // Test payments table
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('count');

    if (paymentsError) {
      console.error('❌ Payments table error:', paymentsError.message);
      return false;
    }
    console.log('✅ Payments table: Connected');

    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

async function testStorageConnection() {
  console.log('\n🔍 Testing Storage Connection...\n');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // List all buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error('❌ Storage error:', bucketsError.message);
      return false;
    }

    console.log('📦 Available buckets:', buckets?.map(b => b.name).join(', ') || 'None');

    // Check if consultation-photos bucket exists
    const consultationBucket = buckets?.find(b => b.id === STORAGE_BUCKET);

    if (!consultationBucket) {
      console.error(`❌ Bucket '${STORAGE_BUCKET}' not found`);
      console.log('\n📝 To create the bucket:');
      console.log('   1. Go to Supabase Dashboard → Storage');
      console.log('   2. Click "Create a new bucket"');
      console.log(`   3. Name: ${STORAGE_BUCKET}`);
      console.log('   4. Public: Yes');
      console.log('   5. File size limit: 5 MB');
      return false;
    }

    console.log(`✅ Bucket '${STORAGE_BUCKET}': Found`);
    console.log(`   - Public: ${consultationBucket.public ? 'Yes' : 'No'}`);
    console.log(`   - File size limit: ${consultationBucket.file_size_limit ? (consultationBucket.file_size_limit / 1024 / 1024).toFixed(2) + ' MB' : 'Not set'}`);

    // Try to list files (should work even if empty)
    const { data: files, error: listError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list();

    if (listError) {
      console.warn('⚠️  List files warning:', listError.message);
    } else {
      console.log(`✅ Storage access: Working (${files?.length || 0} files)`);
    }

    return true;
  } catch (error) {
    console.error('❌ Storage connection failed:', error);
    return false;
  }
}

async function testServiceRole() {
  console.log('\n🔍 Testing Service Role...\n');

  if (!serviceRoleKey) {
    console.log('⚠️  SUPABASE_SERVICE_ROLE_KEY not set (optional for MVP)');
    console.log('   Using publishable key for server operations');
    return true;
  }

  try {
    const serverSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await serverSupabase.from('consultations').select('count');

    if (error) {
      console.error('❌ Service role error:', error.message);
      return false;
    }

    console.log('✅ Service role: Working');
    return true;
  } catch (error) {
    console.error('❌ Service role test failed:', error);
    return false;
  }
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Supabase Connection Test');
  console.log('═══════════════════════════════════════');

  // Check environment variables
  console.log('\n📋 Environment Variables:\n');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✅ Set' : '⚠️  Not set (optional)');
  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Missing');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('\n❌ Missing required environment variables. Please check your .env.local file.');
    process.exit(1);
  }

  // Run tests
  const dbSuccess = await testDatabaseConnection();
  const storageSuccess = await testStorageConnection();
  const serviceRoleSuccess = await testServiceRole();

  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('  Test Summary');
  console.log('═══════════════════════════════════════\n');
  console.log('Database:', dbSuccess ? '✅ Pass' : '❌ Fail');
  console.log('Storage:', storageSuccess ? '✅ Pass' : '❌ Fail');
  console.log('Service Role:', serviceRoleSuccess ? '✅ Pass' : '⚠️  Optional');

  if (dbSuccess && storageSuccess) {
    console.log('\n🎉 All tests passed! Your Supabase setup is ready.\n');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.\n');
    process.exit(1);
  }
}

main();
