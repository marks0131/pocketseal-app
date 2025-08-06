// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import ApiKeysPage from './pages/admin/ApiKeysPage';
import ChatLayout from './components/layout/ChatLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import GeneralSettingsPage from './pages/admin/GeneralSettingsPage';
import NgWordManagementPage from './pages/admin/NgWordManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route path="/thread/:threadId" element={<ChatLayout />} />

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