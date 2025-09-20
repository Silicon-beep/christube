import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, Bell, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-youtube-gray z-50 h-14 flex items-center px-4 border-b border-youtube-lightgray">
      <div className="flex items-center flex-1">
        {/* Menu and Logo */}
        <div className="flex items-center">
          <button className="p-2 hover:bg-youtube-lightgray rounded-full mr-4">
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-youtube-red mr-1">ChrisTube</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-youtube-dark border border-youtube-lightgray rounded-l-full focus:outline-none focus:border-blue-500 text-youtube-text placeholder-youtube-textSecondary"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-youtube-lightgray border border-l-0 border-youtube-lightgray rounded-r-full hover:bg-gray-600 transition-colors"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          <Link
            to="/upload"
            className="p-2 hover:bg-youtube-lightgray rounded-full transition-colors"
            title="Upload Video"
          >
            <Upload size={20} />
          </Link>
          
          <button
            className="p-2 hover:bg-youtube-lightgray rounded-full transition-colors"
            title="Notifications"
          >
            <Bell size={20} />
          </button>

          <Link
            to="/profile/1"
            className="p-2 hover:bg-youtube-lightgray rounded-full transition-colors"
            title="Your Account"
          >
            <User size={20} />
          </Link>

          <div className="flex space-x-2 ml-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-400 hover:bg-youtube-lightgray rounded-full transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;