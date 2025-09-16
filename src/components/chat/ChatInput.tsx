import React, { useState } from 'react';
import axios from 'axios';
import type { Message } from './ChatBubble';

const ngWords = ['社外秘', '個人情報', '給与'];

interface ChatInputProps {
  onSendMessage: (userMessage: Message, aiResponse: string) => void;
  threadId: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, threadId }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const isNgWordIncluded = ngWords.some(word => inputMessage.includes(word));
    const userMessage: Message = { sender: 'user', text: inputMessage };
    
    let aiResponseText = '';
    
    if (isNgWordIncluded) {
      aiResponseText = 'これはNGワードが含まれているため対応いたしかねます。';
    } else {
      try {
        setLoading(true);
        const response = await axios.post(`http://127.0.0.1:8000/thread/${threadId}/message`, { content: inputMessage });
        aiResponseText = response.data.content;
      } catch (error) {
        console.error("API呼び出しエラー:", error);
        aiResponseText = 'AI応答の取得中にエラーが発生しました。';
      } finally {
        setLoading(false);
      }
    }

    onSendMessage(userMessage, aiResponseText);
    setInputMessage('');
  };

  return (
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
  );
};

export default ChatInput;