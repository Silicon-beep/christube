import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-youtube-dark min-h-screen text-youtube-text">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch/:id" element={<VideoPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
