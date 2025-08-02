import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatLayout from './components/layout/ChatLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        <Route path="/thread/:threadId" element={<ChatLayout />} />
      </Routes>
    </Router>
  );
}

export default App;