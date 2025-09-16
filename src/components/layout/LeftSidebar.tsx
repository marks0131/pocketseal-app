import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RxTrash, RxPencil1 } from 'react-icons/rx';

interface Thread {
  id: string;
  title: string;
}

const LeftSidebar = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const navigate = useNavigate();
  const { threadId: activeThreadId } = useParams<{ threadId?: string }>();
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/threads');
        setThreads(response.data);
      } catch (error) {
        console.error("スレッドの取得中にエラーが発生しました:", error);
      }
    };
    fetchThreads();
  }, []);

  const handleAddThread = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/thread', {
        title: `新しいチャット`,
      });
      const newThread = response.data;
      setThreads([...threads, newThread]);
      navigate(`/thread/${newThread.id}`);
    } catch (error) {
      console.error("スレッドの作成中にエラーが発生しました:", error);
    }
  };

  const handleDeleteThread = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await axios.delete(`http://127.0.0.1:8000/thread/${id}`);
      setThreads(threads.filter(thread => thread.id !== id));
      
      if (activeThreadId === id) {
        navigate('/');
      }
    } catch (error) {
      console.error("スレッドの削除中にエラーが発生しました:", error);
    }
  };
  
  const handleStartEditing = (e: React.MouseEvent, id: string, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingThreadId(id);
    setNewTitle(title);
  };
  
  const handleSaveTitle = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:8000/thread/${id}`, {
        new_title: newTitle,
      });
      setThreads(threads.map(thread => thread.id === id ? { ...thread, title: newTitle } : thread));
      setEditingThreadId(null);
    } catch (error) {
      console.error("タイトルの更新中にエラーが発生しました:", error);
    }
  };

  return (
    <div className="w-64 bg-base-100 p-4 shadow-xl flex-shrink-0 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">スレッド</div>
        <button onClick={handleAddThread} className="btn btn-sm btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <ul className="menu bg-base-100 w-full rounded-box">
        {threads.map((thread) => (
          <li key={thread.id}>
            <div className="flex justify-between items-center pr-2">
              {editingThreadId === thread.id ? (
                <form onSubmit={(e) => handleSaveTitle(e, thread.id)} className="flex-grow flex items-center join">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="input input-sm input-bordered flex-grow join-item"
                  />
                  <button type="submit" className="btn btn-sm btn-primary join-item">保存</button>
                </form>
              ) : (
                <>
                  <NavLink
                    to={`/thread/${thread.id}`}
                    className={({ isActive }) =>
                      `flex-grow ${isActive ? 'active' : ''}`
                    }
                  >
                    {thread.title}
                  </NavLink>
                  <button 
                    onClick={(e) => handleStartEditing(e, thread.id, thread.title)} 
                    className="btn btn-xs btn-ghost btn-circle"
                  >
                    <RxPencil1 className="w-4 h-4" />
                  </button>
                </>
              )}
              <button 
                onClick={(e) => handleDeleteThread(e, thread.id)} 
                className="btn btn-xs btn-ghost btn-circle"
              >
                <RxTrash className="w-4 h-4 text-error" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LeftSidebar;