import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
          {isUser ? <FaUser className="w-5 h-5" /> : <FaRobot className="w-5 h-5" />}
        </div>
      </div>
      <div
        className={`chat-bubble ${
          isUser
            ? 'chat-bubble-secondary'
            : 'chat-bubble-primary text-primary-content'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatBubble;