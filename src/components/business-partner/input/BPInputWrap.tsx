'use client';

import BPVoiceBar from './BPVoiceBar';
import BPFilePreviews from './BPFilePreviews';
import BPTextarea from './BPTextarea';
import BPToolbar from './BPToolbar';
import { useState } from 'react';

interface BPInputWrapProps {
  onSend: (text: string, files: File[]) => void;
}

export default function BPInputWrap({ onSend }: BPInputWrapProps) {
  const [text, setText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSend = () => {
    if (text.trim() || files.length > 0) {
      onSend(text, files);
      setText('');
      setFiles([]);
    }
  };

  const handleFileSelect = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bp-input-wrap">
      <BPVoiceBar
        isActive={isVoiceActive}
        onStop={() => setIsVoiceActive(false)}
      />

      <BPFilePreviews
        files={files.map(f => ({
          name: f.name,
          size: (f.size / 1024).toFixed(1) + ' KB'
        }))}
        onRemove={removeFile}
      />

      <div className="bp-input-box">
        <BPTextarea
          value={text}
          onChange={setText}
          onEnter={handleSend}
        />
        <BPToolbar
          charCount={text.length}
          isVoiceActive={isVoiceActive}
          onToggleVoice={() => setIsVoiceActive(!isVoiceActive)}
          onFileSelect={handleFileSelect}
          canSend={text.trim().length > 0 || files.length > 0}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
