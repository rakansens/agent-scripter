import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TypingCodeBlockProps {
  code: string;
  language?: string;
  typingSpeed?: number;
}

const TypingCodeBlock = ({ 
  code, 
  language = 'typescript', 
  typingSpeed = 30 
}: TypingCodeBlockProps) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => prev + code[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [code, currentIndex, typingSpeed]);

  return (
    <div className="relative rounded-lg overflow-hidden my-2">
      <div className="absolute top-2 right-2 flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem 1rem 1rem',
          borderRadius: '0.5rem',
        }}
      >
        {displayedCode}
      </SyntaxHighlighter>
      {currentIndex < code.length && (
        <div className="absolute bottom-2 right-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-typing-dot" />
            <div className="w-2 h-2 bg-white rounded-full animate-typing-dot [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-white rounded-full animate-typing-dot [animation-delay:0.4s]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingCodeBlock;