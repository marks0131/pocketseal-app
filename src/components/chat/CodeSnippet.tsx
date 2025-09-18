import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface CodeSnippetProps {
  language: string;
  code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative my-2 rounded-lg bg-[#282c34]">
      <div className="flex items-center justify-between px-4 py-2 bg-base-300/30 rounded-t-lg">
        <span className="text-sm font-sans text-base-content/60">{language}</span>
        <button onClick={handleCopy} className="btn btn-ghost btn-xs">
          {isCopied ? (
            <>
              <FaCheck className="w-4 h-4 text-success" />
              <span className="text-xs ml-1 text-success">Copied!</span>
            </>
          ) : (
            <>
              <FaCopy className="w-4 h-4" />
              <span className="text-xs ml-1">Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{ 
          margin: 0, 
          padding: '1rem',
          borderRadius: '0 0 0.5rem 0.5rem',
          backgroundColor: 'transparent'
        }}
        codeTagProps={{ 
          style: { 
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '0.875rem'
          } 
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;