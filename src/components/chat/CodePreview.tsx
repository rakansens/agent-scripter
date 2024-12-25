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
        const blob = new Blob([`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  margin: 0; 
                  padding: 16px; 
                  font-family: system-ui, -apple-system, sans-serif;
                  line-height: 1.5;
                }
                .error {
                  color: #ef4444;
                  padding: 8px;
                  border: 1px solid #ef4444;
                  border-radius: 4px;
                  margin: 8px 0;
                }
                .preview-container {
                  padding: 1rem;
                  border-radius: 0.5rem;
                  background: white;
                }
              </style>
            </head>
            <body>
              <div class="preview-container">
                ${code}
              </div>
              <script>
                window.onerror = function(msg, url, line) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'error';
                  errorDiv.textContent = 'Error: ' + msg + ' (line ' + line + ')';
                  document.body.appendChild(errorDiv);
                  window.parent.postMessage({ type: 'error', message: msg }, '*');
                  return false;
                };
              </script>
            </body>
          </html>
        `], { type: 'text/html' });
        
        const url = URL.createObjectURL(blob);
        iframe.src = url;

        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === 'error') {
            setError(event.data.message);
          }
        };

        window.addEventListener('message', handleMessage);

        return () => {
          URL.revokeObjectURL(url);
          window.removeEventListener('message', handleMessage);
        };
      } catch (error) {
        console.error('Error in CodePreview:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    }
  }, [code]);

  return (
    <div className="relative w-full h-full min-h-[200px] bg-white rounded-lg overflow-hidden">
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