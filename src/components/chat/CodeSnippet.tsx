import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'python' }) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlightedCode = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://127.0.0.1:8000/highlight', {
          code,
          language,
        });
        setHighlightedCode(response.data.highlighted_code);
      } catch (error) {
        console.error("構文ハイライトAPI呼び出しエラー:", error);
        setHighlightedCode(`構文ハイライトに失敗しました: ${code}`);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlightedCode();
  }, [code, language]);

  if (loading) {
    return (
      <div className="p-4 bg-gray-800 text-gray-400 font-mono rounded-lg">
        <span className="loading loading-dots loading-xs mr-2"></span>
        <span>コードをハイライト中...</span>
      </div>
    );
  }

  return (
    <div
      className="p-4 bg-gray-800 text-white font-mono rounded-lg overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodeSnippet;