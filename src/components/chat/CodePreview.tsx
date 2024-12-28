import { useEffect, useRef, useState } from 'react';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      try {
        console.log('Rendering code:', code); // デバッグ用
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
                .error {
                  color: red;
                  padding: 8px;
                  border: 1px solid red;
                  margin: 8px 0;
                  border-radius: 4px;
                }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script type="text/babel">
                try {
                  ${code}
                  
                  // コンポーネントが存在する場合はレンダリング
                  if (typeof App !== 'undefined') {
                    ReactDOM.render(<App />, document.getElementById('root'));
                  } else {
                    // コードをそのまま表示
                    ReactDOM.render(${code}, document.getElementById('root'));
                  }
                } catch (error) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'error';
                  errorDiv.textContent = 'Error: ' + error.message;
                  document.body.appendChild(errorDiv);
                }
              </script>
            </body>
          </html>
        `], { type: 'text/html' });
        
        const url = URL.createObjectURL(blob);
        iframe.src = url;

        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error in CodePreview:', error);
        setError(error instanceof Error ? error.message : 'エラーが発生しました');
      }
    }
  }, [code]);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-white rounded-lg overflow-hidden">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-600 p-2 text-sm">
          {error}
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full border-none"
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default CodePreview;