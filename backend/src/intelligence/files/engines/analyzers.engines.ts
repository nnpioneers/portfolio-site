import { FileAnalysisResult, FileMetadata } from '../types/files.types';

export class BusinessAnalyzer {
  static extractMetrics(text: string) {
    // Mock extraction
    return {
      investment: '$50,000',
      revenue: 'Projected $100k ARR',
      timeline: '6 months to launch'
    };
  }
}

export class ProjectAnalyzer {
  static generateReview(lang: string, files: string[]) {
    return {
      isCodeProject: true,
      projectType: lang === 'TypeScript' ? 'React/Node.js' : 'General',
      codeQualityScore: 85,
      securityFlags: ['Consider rotating exposed mock API keys']
    };
  }
}

export class DocumentAnalyzer {
  async analyze(metadata: FileMetadata, fileBuffer?: any): Promise<Partial<FileAnalysisResult>> {
    console.log(`[DocumentAnalyzer] Analyzing ${metadata.filename}`);
    
    // Mock behavior: If name contains "business", extract business metrics
    const isBusiness = metadata.filename.toLowerCase().includes('business') || metadata.filename.toLowerCase().includes('plan');
    
    let businessMetrics = undefined;
    if (isBusiness) {
      businessMetrics = BusinessAnalyzer.extractMetrics("Mock Text");
    }

    return {
      summary: `This is a mock summary of the document ${metadata.filename}.`,
      keywords: ['Mock', 'Document', 'Analysis'],
      detectedLanguage: 'English',
      isBusinessDocument: isBusiness,
      businessMetrics
    };
  }
}

export class CodeAnalyzer {
  async analyze(metadata: FileMetadata, codeString?: string): Promise<Partial<FileAnalysisResult>> {
    console.log(`[CodeAnalyzer] Analyzing code file ${metadata.filename}`);
    const ext = metadata.extension.toLowerCase();
    
    let lang = 'Unknown';
    if (['ts', 'tsx'].includes(ext)) lang = 'TypeScript';
    if (['js', 'jsx'].includes(ext)) lang = 'JavaScript';
    if (['py'].includes(ext)) lang = 'Python';

    const projectInsight = ProjectAnalyzer.generateReview(lang, [metadata.filename]);

    return {
      summary: `Source code file written in ${lang}.`,
      detectedLanguage: lang,
      ...projectInsight
    };
  }
}

export class ArchiveAnalyzer {
  async analyze(metadata: FileMetadata): Promise<Partial<FileAnalysisResult>> {
    console.log(`[ArchiveAnalyzer] Analyzing ZIP ${metadata.filename}`);
    return {
      summary: `Archive containing multiple project files.`,
      isCodeProject: true,
      projectType: 'Detected Node.js Project (Found package.json)'
    };
  }
}

export class ImageAnalyzer {
  async analyze(metadata: FileMetadata, ocrText: string): Promise<Partial<FileAnalysisResult>> {
    console.log(`[ImageAnalyzer] Analyzing image ${metadata.filename}`);
    return {
      summary: `Image analysis completed.`,
      ocrText,
      imageType: 'UI'
    };
  }
}
