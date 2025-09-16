import React from 'react';

interface TextHighlighterProps {
  text: string;
  highlightWords: string[];
}

const TextHighlighter: React.FC<TextHighlighterProps> = ({ text, highlightWords }) => {
  const parts = text.split(/(\s+)/);

  return (
    <p>
      {parts.map((part, index) => {
        const isHighlight = highlightWords.includes(part);
        return (
          <span
            key={index}
            className={isHighlight ? 'underline text-red-500' : ''}
          >
            {part}
          </span>
        );
      })}
    </p>
  );
};

export default TextHighlighter;