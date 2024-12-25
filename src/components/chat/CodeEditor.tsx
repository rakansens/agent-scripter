import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor = ({ code, language, onChange, readOnly = false }: CodeEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(code);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  if (readOnly || !isEditing) {
    return (
      <div className="relative group">
        {!readOnly && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute hidden group-hover:block right-2 top-2 bg-primary text-white px-2 py-1 rounded text-sm"
          >
            Edit
          </button>
        )}
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full h-full min-h-[200px] bg-gray-900 text-gray-100 p-4 font-mono text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        spellCheck={false}
      />
      <button
        onClick={() => setIsEditing(false)}
        className="absolute right-2 top-2 bg-primary text-white px-2 py-1 rounded text-sm"
      >
        Preview
      </button>
    </div>
  );
};

export default CodeEditor;