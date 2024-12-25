import { useEffect, useRef } from 'react';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
              </style>
            </head>
            <body>
              ${code}
              <script>
                window.onerror = function(msg, url, line) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'error';
                  errorDiv.textContent = 'Error: ' + msg + ' (line ' + line + ')';
                  document.body.appendChild(errorDiv);
                  return false;
                };
              </script>
            </body>
          </html>
        `], { type: 'text/html' });
        
        const url = URL.createObjectURL(blob);
        iframe.src = url;

        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error('Error in CodePreview:', error);
      }
    }
  }, [code]);

  return (
    <div className="w-full h-full min-h-[200px] bg-white rounded-lg overflow-hidden">
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