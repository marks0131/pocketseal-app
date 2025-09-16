import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { RxGear } from 'react-icons/rx';
import ChatInput from '../chat/ChatInput';
import ChatBubble from '../chat/ChatBubble';
import type { Message } from '../chat/ChatBubble';

const ChatMain: React.FC = () => {
  const { threadId: urlThreadId } = useParams<{ threadId?: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const fetchThread = async (id: string) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/thread/${id}`);
        const loadedMessages = response.data.messages.map((msg: any) => ({
          sender: msg.role === 'USER' ? 'user' : 'ai',
          text: msg.content,
        }));
        setMessages(loadedMessages);
      } catch (error) {
        console.error('スレッドの読み込み中にエラーが発生しました:', error);
        setMessages([{ sender: 'ai', text: 'スレッドの読み込みに失敗しました。' }]);
      }
    };

    const createNewThread = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/thread', {
          title: '新しいチャット',
        });
        setThreadId(response.data.id);
        setMessages([{ sender: 'ai', text: '新規チャットへようこそ！' }]);
      } catch (error) {
        console.error('スレッドの作成中にエラーが発生しました:', error);
      }
    };
    
    if (urlThreadId) {
      setThreadId(urlThreadId);
      fetchThread(urlThreadId);
    } else {
      createNewThread();
    }
  }, [urlThreadId]);

  const handleNewMessage = (userMessage: Message, aiResponse: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { sender: 'ai', text: aiResponse },
    ]);
  };

  if (!threadId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 bg-base-100 overflow-hidden">
      <div className="p-4 border-b border-base-300 flex-shrink-0 flex justify-between items-center">
        <h2 className="text-xl font-bold">Customer Support</h2>
        <Link to="/admin" className="btn btn-sm btn-ghost btn-circle">
          <RxGear className="w-5 h-5" />
        </Link>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
      </div>
      <ChatInput onSendMessage={handleNewMessage} threadId={threadId} />
    </div>
  );
};
export default ChatMain;