import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import ChatMain from './ChatMain';
import RightSidebar from './RightSidebar';

const ChatLayout = () => {
  const [threads, setThreads] = useState([
    { id: '1', name: '新規チャット' },
    { id: '2', name: '2025年度前期時間割について' },
    { id: '3', name: '職場から家までの行き方' },
  ]);

  const addThread = () => {
    const newId = (threads.length + 1).toString();
    const newThread = { id: newId, name: `新しいチャット ${newId}` };
    setThreads([...threads, newThread]);
  };

  return (
    <div className="flex h-screen bg-base-200">
      <LeftSidebar threads={threads} onAddThread={addThread} />
      <ChatMain />
      <RightSidebar />
    </div>
  );
};

export default ChatLayout;