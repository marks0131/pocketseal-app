import React from 'react';

const HIGHLIGHT_KEYWORDS = [
  { text: '任天堂', className: 'bg-red-300 text-red-800' },
  { text: 'Nintendo Switch 2', className: 'bg-blue-300 text-blue-800' },
  { text: 'Python', className: 'bg-yellow-200 text-yellow-800' },
];

interface KeywordHighlighterProps {
  text: string;
}

const KeywordHighlighter: React.FC<KeywordHighlighterProps> = ({ text }) => {
  if (!text) return null;

  const regex = new RegExp(`(${HIGHLIGHT_KEYWORDS.map(k => k.text).join('|')})`, 'g');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        const keyword = HIGHLIGHT_KEYWORDS.find(k => k.text === part);
        if (keyword) {
          return (
            <span key={index} className={`px-1 rounded-sm ${keyword.className}`}>
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};

export default KeywordHighlighter;