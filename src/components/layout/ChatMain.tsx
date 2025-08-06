import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatBubble from '../chat/ChatBubble';
import type { Message } from '../chat/ChatBubble';
import { Link } from 'react-router-dom';
import { RxGear } from 'react-icons/rx';

const chatData: { [key: string]: Message[] } = {
  '1': [
    { sender: 'ai', text: '新規チャットへようこそ！' },
  ],
  '2': [
    { sender: 'ai', text: '2025年度前期時間割についてですね。何かお困りですか？' },
    { sender: 'user', text: '火曜日の5限は何の授業でしたっけ？' },
    { sender: 'ai', text: 'English IIの授業です。' },
  ],
  '3': [
    { sender: 'ai', text: '職場から家までの行き方についてですね。どの駅から出発しますか？' },
    { sender: 'user', text: '京都駅から職場までです。' },
    { sender: 'ai', text: '京都駅から職場（京都デザイン＆テクノロジー専門学校）までは、電車で15分、徒歩で35分程度です。' },
  ],
};

const ChatMain = () => {
  const { threadId } = useParams<{ threadId?: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const currentThreadId = threadId || '1';
    setMessages(chatData[currentThreadId] || []);
  }, [threadId]);

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
      <div className="p-4 border-b border-base-300 flex-shrink-0 flex justify-between items-center">
        <h2 className="text-xl font-bold">Customer Support</h2>
        <Link to="/admin" className="btn btn-sm btn-ghost btn-circle">
          <RxGear className="w-5 h-5" />
        </Link>
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