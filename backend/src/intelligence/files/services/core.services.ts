import { FileType, FileMetadata } from '../types/files.types';

export class FileClassifier {
  static classify(metadata: FileMetadata): FileType {
    const ext = metadata.extension.toLowerCase();
    
    if (['pdf', 'docx', 'txt', 'md', 'csv'].includes(ext)) return 'DOCUMENT';
    if (['ts', 'js', 'py', 'java', 'cs', 'cpp', 'html', 'css', 'json'].includes(ext)) return 'CODE';
    if (['xlsx', 'xls'].includes(ext)) return 'SPREADSHEET';
    if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) return 'IMAGE';
    if (['zip', 'rar'].includes(ext)) return 'ARCHIVE';
    
    return 'UNKNOWN';
  }
}

export class MetadataExtractor {
  static extractMock(filename: string): FileMetadata {
    const ext = filename.split('.').pop() || '';
    return {
      filename,
      extension: ext,
      sizeBytes: Math.floor(Math.random() * 5000000) + 1000,
      mimeType: `application/${ext}`,
      uploadedAt: new Date()
    };
  }
}

export class OCRService {
  async extractText(imageUrl: string): Promise<string> {
    console.log(`[OCRService] Running mock OCR extraction on ${imageUrl}...`);
    return "Extracted Mock Text: Contains Tamil and English words.";
  }
}

export class VirusScanner {
  async scan(filePath: string): Promise<boolean> {
    // Placeholder for ClamAV
    return true; // true = safe
  }
}
