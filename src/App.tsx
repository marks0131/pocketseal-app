import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ChatLayout from './components/layout/ChatLayout';
import GeneralSettingsPage from './pages/admin/GeneralSettingsPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import NgWordManagementPage from './pages/admin/NgWordManagementPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route path="/thread/:threadId" element={<ChatLayout />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="ng-words" element={<NgWordManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route index element={<AdminDashboardPage />} />
          <Route path="settings/general" element={<GeneralSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;