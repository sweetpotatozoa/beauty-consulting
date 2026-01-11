import OpenAI from 'openai';

// Initialize OpenAI client
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey,
});

// Prompt templates for K-Beauty styling analysis
const ANALYSIS_PROMPT = `You are a professional K-Beauty styling consultant specializing in hair and fashion for Asian women.

Analyze the uploaded photo and provide styling recommendations based on:
- Face shape and features
- Current hair color and style
- Skin tone
- Overall style and fashion sense

Focus on K-Beauty trends popular in Taiwan, Hong Kong, and Singapore markets.`;

const FREE_ANALYSIS_PROMPT = `${ANALYSIS_PROMPT}

Provide a BASIC analysis including:
1. Face shape classification
2. Current hair color description
3. 3-5 style keywords that describe the person
4. One brief styling suggestion (2-3 sentences)

Format as JSON with keys: face_shape, hair_color, style_keywords (array), basic_recommendation`;

const PAID_ANALYSIS_PROMPT = `${ANALYSIS_PROMPT}

Provide a DETAILED analysis including:
1. Comprehensive face shape and feature analysis
2. Personalized hair color and style recommendations with specific references
3. Fashion style guidance aligned with K-Beauty trends
4. 5-7 specific K-Beauty product recommendations (hair and makeup) with reasons
5. Detailed styling tips for different occasions (daily, date, work)
6. Current K-Beauty trends that would suit this person

Format as JSON with keys:
- detailed_analysis (string)
- hair_recommendations (object with color, style, maintenance)
- fashion_guidance (string)
- product_recommendations (array of {name, category, reason, where_to_buy})
- styling_tips (object with daily, date, work keys)
- k_beauty_trends (array of strings)`;

export interface AnalysisResult {
  free_result?: {
    face_shape: string;
    hair_color: string;
    style_keywords: string[];
    basic_recommendation: string;
  };
  paid_result?: {
    detailed_analysis: string;
    hair_recommendations: {
      color: string;
      style: string;
      maintenance: string;
    };
    fashion_guidance: string;
    product_recommendations: Array<{
      name: string;
      category: string;
      reason: string;
      where_to_buy?: string;
    }>;
    styling_tips: {
      daily: string;
      date: string;
      work: string;
    };
    k_beauty_trends: string[];
  };
}

/**
 * Analyze photo with GPT-4 Vision for free tier (basic analysis)
 */
export async function analyzeFreePhoto(imageUrl: string): Promise<AnalysisResult['free_result']> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: FREE_ANALYSIS_PROMPT },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing photo (free):', error);
    throw new Error('Failed to analyze photo');
  }
}

/**
 * Analyze photo with GPT-4 Vision for paid tier (detailed analysis)
 */
export async function analyzePaidPhoto(imageUrl: string): Promise<AnalysisResult['paid_result']> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: PAID_ANALYSIS_PROMPT },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing photo (paid):', error);
    throw new Error('Failed to analyze photo');
  }
}
