export type FileType = 'DOCUMENT' | 'CODE' | 'SPREADSHEET' | 'IMAGE' | 'ARCHIVE' | 'UNKNOWN';

export interface FileMetadata {
  filename: string;
  extension: string;
  sizeBytes: number;
  mimeType: string;
  uploadedAt: Date;
}

export interface FileAnalysisResult {
  fileId: string;
  metadata: FileMetadata;
  classification: FileType;
  
  // Specific extractions
  summary?: string;
  keywords?: string[];
  detectedLanguage?: string;
  
  // Document specific
  isBusinessDocument?: boolean;
  businessMetrics?: {
    investment?: string;
    revenue?: string;
    timeline?: string;
  };
  
  // Code specific
  isCodeProject?: boolean;
  projectType?: string;
  codeQualityScore?: number;
  securityFlags?: string[];
  
  // Image specific
  ocrText?: string;
  imageType?: 'UI' | 'DIAGRAM' | 'INVOICE' | 'OTHER';
}
