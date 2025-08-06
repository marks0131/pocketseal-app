import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ChatLayout from './components/layout/ChatLayout';
import NgWordManagementPage from './pages/admin/NgWordManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route path="/thread/:threadId" element={<ChatLayout />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="ng-words" element={<NgWordManagementPage />} />
          <Route index element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;