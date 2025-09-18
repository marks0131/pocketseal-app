import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import CodeSnippet from './CodeSnippet';
import KeywordHighlighter from './KeywordHighlighter';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export interface MessagePart {
  text: string;
  type: string;
}

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const codeBlockRegex = /```(\w+)\n([\s\S]+?)```/s;
  const match = isUser ? null : message.text.match(codeBlockRegex);

  const renderContent = () => {
    if (!match) {
      return <KeywordHighlighter text={message.text} />;
    }

    const beforeCode = message.text.substring(0, match.index);
    const afterCode = message.text.substring(match.index! + match[0].length);
    const language = match[1];
    const code = match[2].trim();

    return (
      <>
        {beforeCode && <p className="mb-2"><KeywordHighlighter text={beforeCode} /></p>}
        <CodeSnippet language={language} code={code} />
        {afterCode && <p className="mt-2"><KeywordHighlighter text={afterCode} /></p>}
      </>
    );
  };

  return (
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
          {isUser ? <FaUser className="w-5 h-5" /> : <FaRobot className="w-5 h-5" />}
        </div>
      </div>
      <div
        className={`chat-bubble whitespace-pre-wrap ${
          isUser
            ? 'chat-bubble-secondary'
            : match ? 'bg-transparent shadow-none p-0' : 'chat-bubble-primary text-primary-content'
        }`}
      >
        {isUser ? message.text : renderContent()}
      </div>
    </div>
  );
};

export default ChatBubble;