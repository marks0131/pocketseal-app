import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import axios from 'axios';

export interface Thread {
  id: string;
  title: string;
}

const ChatLayout: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const navigate = useNavigate();

  const fetchThreads = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/threads');
      setThreads(response.data);
    } catch (error) {
      console.error("スレッドの取得中にエラーが発生しました:", error);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleAddThread = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/thread', { title: '新しいチャット' });
      const newThread = response.data;
      setThreads(prev => [...prev, newThread]);
      navigate(`/chat/${newThread.id}`);
    } catch (error) {
      console.error("スレッドの作成中にエラーが発生しました:", error);
    }
  };

  return (
    <div className="flex h-screen bg-base-300 text-base-content">
      <LeftSidebar 
        threads={threads} 
        onAddThread={handleAddThread}
        onThreadsUpdate={fetchThreads}
      />
      <main className="flex-1 flex flex-col">
        <Outlet /> 
      </main>
      <RightSidebar />
    </div>
  );
};

export default ChatLayout;