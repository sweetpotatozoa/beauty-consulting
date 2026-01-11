// Database table types matching Supabase schema

export interface Consultation {
  id: string;
  input_data: {
    photo_url: string;
    photo_path?: string; // Storage path for deletion
    user_info?: {
      age?: number;
      preferences?: string;
      concerns?: string;
    };
  };
  free_result: {
    face_shape: string;
    hair_color: string;
    style_keywords: string[];
    basic_recommendation: string;
  };
  created_at: string;
}

export interface PaidReport {
  id: string;
  consultation_id: string;
  email: string;
  paid_result: {
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
  created_at: string;
}

export interface Payment {
  id: string;
  paid_report_id: string;
  email: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paid_at?: string;
  created_at: string;
}

// API request/response types

export interface CreateConsultationRequest {
  photo: File;
  userInfo?: {
    age?: number;
    preferences?: string;
    concerns?: string;
  };
}

export interface CreateConsultationResponse {
  consultationId: string;
  freeResult: Consultation['free_result'];
}

export interface GetConsultationResponse {
  consultation: Consultation;
}

export interface CreatePaymentRequest {
  consultationId: string;
  email: string;
  paymentMethod?: string; // TBD based on payment provider
}

export interface CreatePaymentResponse {
  reportId: string;
  paymentId: string;
  email: string;
  message: string;
}

export interface GetReportResponse {
  report: PaidReport;
  consultation: Consultation;
}

// UI component prop types

export interface PhotoUploadProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
  error?: string;
}

export interface ConsultationResultProps {
  consultation: Consultation;
  onUpgrade?: () => void;
}

export interface PaymentFormProps {
  consultationId: string;
  onSuccess: (reportId: string) => void;
  onError: (error: string) => void;
}

export interface DetailedReportProps {
  report: PaidReport;
  consultation: Consultation;
}
