import { useEffect, useRef } from 'react';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { margin: 0; padding: 16px; font-family: sans-serif; }
              </style>
            </head>
            <body>
              ${code}
              <script>
                window.onerror = function(msg, url, line) {
                  document.body.innerHTML += '<div style="color: red;">Error: ' + msg + ' (line ' + line + ')</div>';
                  return false;
                };
              </script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [code]);

  return (
    <div className="w-full h-full min-h-[200px] bg-white rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-none"
        title="Code Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default CodePreview;