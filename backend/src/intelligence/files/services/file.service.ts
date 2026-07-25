import { FileAnalysisResult } from '../types/files.types';
import { FileClassifier, MetadataExtractor, OCRService, VirusScanner } from './core.services';
import { DocumentAnalyzer, CodeAnalyzer, ArchiveAnalyzer, ImageAnalyzer } from '../engines/analyzers.engines';

export class FileService {
  private ocr: OCRService;
  private scanner: VirusScanner;
  private docAnalyzer: DocumentAnalyzer;
  private codeAnalyzer: CodeAnalyzer;
  private archiveAnalyzer: ArchiveAnalyzer;
  private imgAnalyzer: ImageAnalyzer;

  constructor() {
    this.ocr = new OCRService();
    this.scanner = new VirusScanner();
    this.docAnalyzer = new DocumentAnalyzer();
    this.codeAnalyzer = new CodeAnalyzer();
    this.archiveAnalyzer = new ArchiveAnalyzer();
    this.imgAnalyzer = new ImageAnalyzer();
  }

  async processFile(filename: string, fileBuffer?: any): Promise<FileAnalysisResult> {
    console.log(`[FileService] Processing incoming file: ${filename}`);

    // 1. Core Extraction
    const metadata = MetadataExtractor.extractMock(filename);
    const classification = FileClassifier.classify(metadata);

    // 2. Security
    const isSafe = await this.scanner.scan('mock_path');
    if (!isSafe) throw new Error('Security Error: Virus detected in file.');

    // 3. Routing & Analysis
    let specificAnalysis: any = {};
    
    switch (classification) {
      case 'DOCUMENT':
        specificAnalysis = await this.docAnalyzer.analyze(metadata, fileBuffer);
        break;
      case 'CODE':
        specificAnalysis = await this.codeAnalyzer.analyze(metadata, fileBuffer);
        break;
      case 'IMAGE':
        const text = await this.ocr.extractText('mock_url');
        specificAnalysis = await this.imgAnalyzer.analyze(metadata, text);
        break;
      case 'ARCHIVE':
        specificAnalysis = await this.archiveAnalyzer.analyze(metadata);
        break;
      default:
        specificAnalysis = { summary: 'Unsupported file type. Basic metadata extracted.' };
    }

    return {
      fileId: `file_${Date.now()}`,
      metadata,
      classification,
      ...specificAnalysis
    };
  }
}
