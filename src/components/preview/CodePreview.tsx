import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface CodePreviewProps {
  code: string;
  language?: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, language = 'typescript' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const blob = new Blob([`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
            <style>
              body { 
                margin: 0; 
                padding: 16px;
                font-family: system-ui, -apple-system, sans-serif;
              }
              .preview-container {
                padding: 1rem;
                border-radius: 0.5rem;
                background: white;
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              ${code}
              
              // コンポーネントが存在する場合はレンダリング
              if (typeof App !== 'undefined') {
                ReactDOM.render(<App />, document.getElementById('root'));
              }
            </script>
          </body>
        </html>
      `], { type: 'text/html' });
      
      const url = URL.createObjectURL(blob);
      iframe.src = url;

      return () => URL.revokeObjectURL(url);
    }
  }, [code]);

  return (
    <Card className="w-full overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full min-h-[400px] border-none"
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </Card>
  );
};

export default CodePreview;