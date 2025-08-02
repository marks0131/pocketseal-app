import React, { useState } from 'react';
import ChatBubble from '../chat/ChatBubble';
import type { Message } from '../chat/ChatBubble';

const ChatMain = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'カスタマーサポートモードです。お客様の質問に対して、適切な回答を提供します。どのようなお問い合わせでしょうか？' },
    { sender: 'user', text: 'どっかで100円落としたんやけど探してくれんか？' },
    { sender: 'ai', text: '自分で探せカス' },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newUserMessage: Message = { sender: 'user', text: inputMessage };
    setMessages([...messages, newUserMessage]);
    setInputMessage('');

    setTimeout(() => {
      const newAiMessage: Message = { sender: 'ai', text: 'ダミーのAI応答です。' };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col flex-1 bg-base-100 overflow-hidden">
      <div className="p-4 border-b border-base-300 flex-shrink-0">
        <h2 className="text-xl font-bold">Customer Support</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-base-300 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <button type="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13.5" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="メッセージを送信..."
            className="input input-bordered w-full"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatMain;