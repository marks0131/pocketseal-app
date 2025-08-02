import React from 'react';
import LeftSidebar from './LeftSidebar';
import ChatMain from './ChatMain';
import RightSidebar from './RightSidebar';

const ChatLayout = () => {
  return (
    // h-screenが適用されていることを確認
    <div className="flex h-screen bg-base-200">
      <LeftSidebar />
      <ChatMain />
      <RightSidebar />
    </div>
  );
};

export default ChatLayout;