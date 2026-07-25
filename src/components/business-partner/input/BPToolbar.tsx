'use client';

import { Mic, Paperclip, Image as ImageIcon, FileText, Archive, MapPin, Map, Camera, Smile, Send } from 'lucide-react';
import { useRef } from 'react';

interface BPToolbarProps {
  charCount: number;
  isVoiceActive: boolean;
  onToggleVoice: () => void;
  onFileSelect: (files: FileList) => void;
  canSend: boolean;
  onSend: () => void;
}

export default function BPToolbar({
  charCount,
  isVoiceActive,
  onToggleVoice,
  onFileSelect,
  canSend,
  onSend
}: BPToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bp-toolbar">
      <div className="bp-toolbar-left">
        <button 
          className={`bp-tool-btn bp-mic-btn ${isVoiceActive ? 'listening' : ''}`}
          title="Voice Input" 
          aria-label="Voice input"
          onClick={onToggleVoice}
        >
          <span className="bp-mic-icon">
            <Mic className="w-4 h-4" />
          </span>
          <span className="bp-mic-waves">
            <span className="bp-mic-wave-bar"></span>
            <span className="bp-mic-wave-bar"></span>
            <span className="bp-mic-wave-bar"></span>
            <span className="bp-mic-wave-bar"></span>
            <span className="bp-mic-wave-bar"></span>
          </span>
        </button>
        <button className="bp-tool-btn" title="Attach File" aria-label="Attach file" onClick={handleFileClick}>
          <Paperclip className="w-4 h-4" />
        </button>
        <button className="bp-tool-btn" title="Image" aria-label="Upload image" onClick={handleFileClick}>
          <ImageIcon className="w-4 h-4" />
        </button>
        <button className="bp-tool-btn" title="Document" aria-label="Upload document" onClick={handleFileClick}>
          <FileText className="w-4 h-4" />
        </button>
        <button className="bp-tool-btn" title="ZIP / Project Files" aria-label="Upload zip" onClick={handleFileClick}>
          <Archive className="w-4 h-4" />
        </button>
        <button className="bp-tool-btn" title="Share Location" aria-label="Share location">
          <MapPin className="w-4 h-4" />
        </button>
        <button className="bp-tool-btn" title="Share Map" aria-label="Share map">
          <Map className="w-4 h-4" />
        </button>
        <button className="bp-tool-btn" title="Camera" aria-label="Open camera">
          <Camera className="w-4 h-4" />
        </button>
        <button className="bp-tool-btn" title="Emoji" aria-label="Emoji picker">
          <Smile className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="bp-lang-badge" title="Language auto-detected">
          <span className="bp-lang-dot"></span>
          <span>Auto</span>
        </span>
        
        {charCount > 0 && (
          <span className="text-gray-700 font-mono text-[11px]">{charCount}</span>
        )}
        
        <button 
          className="bp-send-btn" 
          disabled={!canSend} 
          aria-label="Send message"
          onClick={onSend}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        multiple
        onChange={handleFileChange}
        accept="image/png,image/jpg,image/jpeg,image/webp,.pdf,.doc,.docx,.txt,.csv,.zip,.html,.css,.js,.java,.py,.json,.xml" 
      />
    </div>
  );
}
