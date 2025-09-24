import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { RxGear } from 'react-icons/rx';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import ThemeToggleButton from '../common/ThemeToggleButton';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import type { Thread } from '../../types';

const ChatLayout: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/threads');
        setThreads(response.data);
      } catch (error) {
        console.error("スレッドの取得中にエラーが発生しました:", error);
        toast.error("スレッド一覧の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    
    fetchThreads();
  }, []);

  const handleAddThread = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/thread', { title: '新しいチャット' });
      const newThread: Thread = response.data;
      setThreads(prev => [...prev, newThread]);
      navigate(`/chat/${newThread.id}`);
      toast.success('新しいチャットを作成しました。');
    } catch (error) {
      console.error("スレッドの作成中にエラーが発生しました:", error);
      toast.error("チャットの作成に失敗しました。");
    }
  };
  
  const handleThreadsUpdate = () => {
    const fetchThreads = async () => {
        const response = await axios.get('http://127.0.0.1:8000/threads');
        setThreads(response.data);
    };
    fetchThreads();
  };

  return (
    <div className="flex h-screen bg-base-300 text-base-content">
      <LeftSidebar 
        threads={threads} 
        onAddThread={handleAddThread}
        onThreadsUpdate={handleThreadsUpdate}
        loading={loading}
      />
      <main className="flex-1 flex flex-col bg-base-100 overflow-hidden">
        <div className="p-4 border-b border-base-300 flex-shrink-0 flex justify-between items-center">
            <h2 className="text-xl font-bold">Customer Support</h2>
            <div className="flex items-center gap-2">
                <ThemeToggleButton />
                <Link to="/admin" className="btn btn-sm btn-ghost btn-circle">
                    <RxGear className="w-5 h-5" />
                </Link>
            </div>
        </div>
        <Outlet /> 
      </main>
      <RightSidebar />
    </div>
  );
};

export default ChatLayout;