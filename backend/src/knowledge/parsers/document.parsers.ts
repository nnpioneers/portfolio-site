export interface IDocumentParser {
  parse(buffer: Buffer): Promise<string>;
}

export class PDFParser implements IDocumentParser {
  async parse(buffer: Buffer): Promise<string> {
    return 'Mock PDF Content';
  }
}

export class DocxParser implements IDocumentParser {
  async parse(buffer: Buffer): Promise<string> {
    return 'Mock DOCX Content';
  }
}

export class TxtParser implements IDocumentParser {
  async parse(buffer: Buffer): Promise<string> {
    return buffer.toString('utf-8');
  }
}

export class CsvParser implements IDocumentParser {
  async parse(buffer: Buffer): Promise<string> {
    return 'Mock CSV Content';
  }
}

export class ImageParser implements IDocumentParser {
  async parse(buffer: Buffer): Promise<string> {
    return 'Mock Image OCR Content'; // Future OCR integration
  }
}
