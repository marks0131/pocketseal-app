import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import CodeSnippet from './CodeSnippet';
import type { Message } from '../../types';

interface ChatBubbleProps {
  message: Message;
}

const getClassNameForEntity = (entity: string): string => {
  switch (entity) {
    case 'ORG': return 'bg-red-300 text-red-800 px-1 rounded-sm';
    case 'PRD': return 'bg-blue-300 text-blue-800 px-1 rounded-sm';
    case 'PERSON': return 'bg-green-300 text-green-800 px-1 rounded-sm';
    case 'LOC': return 'bg-purple-300 text-purple-800 px-1 rounded-sm';
    case 'NG_WORD': return 'bg-gray-600 text-white px-1 rounded-sm line-through decoration-red-500';
    default: return '';
  }
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const renderContent = () => {
    const { text, response } = message;

    const codeBlockRegex = /```(\w+)\n([\s\S]+?)```/s;
    const codeMatch = text.match(codeBlockRegex);

    if (codeMatch) {
      return <CodeSnippet language={codeMatch[1]} code={codeMatch[2].trim()} />;
    }
    
    if (!response || response.length === 0) {
      return text;
    }

    const elements = [];
    let lastIndex = 0;

    response.forEach((segment, index) => {
      if (segment.start > lastIndex) {
        elements.push(text.substring(lastIndex, segment.start));
      }
      elements.push(
        <span key={index} className={getClassNameForEntity(segment.entity_group)}>
          {segment.word}
        </span>
      );
      lastIndex = segment.end;
    });

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return (
      <span>
        {elements.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>)}
      </span>
    );
  };

  return (
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 flex items-center justify-center">
          {isUser ? <FaUser className="w-10 h-10" /> : <FaRobot className="w-10 h-10" />}
        </div>
      </div>
      <div
        className={`chat-bubble whitespace-pre-wrap ${
          isUser
            ? 'chat-bubble-secondary'
            : message.text.match(/```(\w+)\n([\s\S]+?)```/s)
              ? 'bg-transparent shadow-none p-0'
              : 'chat-bubble-primary text-primary-content'
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatBubble;