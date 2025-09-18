import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChatLayout from './components/layout/ChatLayout';
import ChatMain from './components/layout/ChatMain';
import AdminLayout from './components/layout/AdminLayout';
import ApiKeysPage from './pages/admin/ApiKeysPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import GeneralSettingsPage from './pages/admin/GeneralSettingsPage';
import NgWordManagementPage from './pages/admin/NgWordManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';

const SelectChatScreen = () => (
  <div className="flex-1 flex justify-center items-center h-full">
    <p className="text-lg text-base-content/60">
      スレッドを選択するか、新しいチャットを開始してください。
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLayout />}>
          <Route index element={<SelectChatScreen />} />
          <Route path="chat/:threadId" element={<ChatMain />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="ng-words" element={<NgWordManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="settings/general" element={<GeneralSettingsPage />} />
          <Route path="settings/api-keys" element={<ApiKeysPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;