'use client';

import { FileText, X } from 'lucide-react';

interface FileInfo {
  name: string;
  size: string;
}

interface BPFilePreviewsProps {
  files: FileInfo[];
  onRemove: (index: number) => void;
}

export default function BPFilePreviews({ files, onRemove }: BPFilePreviewsProps) {
  if (!files || files.length === 0) return null;

  return (
    <div className="bp-file-previews show">
      {files.map((file, idx) => (
        <div key={idx} className="bp-file-preview-card">
          <div className="bp-fpv-icon">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="bp-fpv-name" title={file.name}>{file.name}</div>
            <div className="bp-fpv-status">{file.size}</div>
          </div>
          <button 
            className="bp-fpv-remove"
            onClick={() => onRemove(idx)}
            aria-label="Remove file"
          >
            <X className="w-2 h-2" />
          </button>
        </div>
      ))}
    </div>
  );
}
