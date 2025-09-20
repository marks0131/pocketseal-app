import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import type { Message } from '../../types';

const ChatMain: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!threadId) return;
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/thread/${threadId}`);
        const loadedMessages: Message[] = response.data.messages.map((msg: any) => ({
          sender: msg.role.toLowerCase() === 'user' ? 'user' : 'ai',
          text: msg.content,
        }));
        setMessages(loadedMessages);
      } catch (error) {
        console.error("メッセージの読み込みに失敗しました:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [threadId]);

  const handleNewMessage = (userMessage: Message, aiResponse: Message) => {
    setMessages((prevMessages) => [...prevMessages, userMessage, aiResponse]);
    setTimeout(() => {
      if (containerRef.current) {
        const lastChild = containerRef.current.lastElementChild;
        lastChild?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1);
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto space-y-4" ref={containerRef}>
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
      </div>
      {threadId && <ChatInput onSendMessage={handleNewMessage} threadId={threadId} />}
    </>
  );
};

export default ChatMain;