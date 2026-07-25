export function useLanguage() {
  const detectLanguage = (text: string | null) => {
    if (!text) return 'english';
    const hasTamil = /[\u0B80-\u0BFF]/.test(text);
    const hasLatin = /[a-zA-Z]/.test(text);
    
    if (hasTamil && hasLatin) return 'tanglish';
    if (hasTamil) return 'tamil';
    return 'english';
  };

  return { detectLanguage };
}
