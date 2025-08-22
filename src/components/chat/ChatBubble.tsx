import React from 'react';

export interface Message {
  sender: 'ai' | 'user';
  text: string;
}

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const chatClass = isUser ? 'chat-end' : 'chat-start';
  const bubbleClass = isUser ? 'chat-bubble-primary chat-bubble-accent' : 'chat-bubble-secondary';

  const senderName = isUser ? 'You' : 'AI';
  const avatarImage = isUser
    ? 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
    : 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';

  return (
    <div className={`chat ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt={`${senderName} Avatar`} src={avatarImage} />
        </div>
      </div>
      <div className={`chat-header mb-1 text-sm text-base-content/70`}>
        {senderName}
      </div>
      <div className={`chat-bubble ${bubbleClass}`}>
        {message.text}
      </div>
    </div>
  );
};

export default ChatBubble;