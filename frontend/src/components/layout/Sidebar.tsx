import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Music, 
  Film, 
  Radio, 
  Gamepad2, 
  Trophy, 
  Clock, 
  ThumbsUp, 
  History,
  PlaySquare
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Music, label: 'Music', path: '/music' },
    { icon: Film, label: 'Movies', path: '/movies' },
    { icon: Radio, label: 'Live', path: '/live' },
    { icon: Gamepad2, label: 'Gaming', path: '/gaming' },
    { icon: Trophy, label: 'Sports', path: '/sports' },
  ];

  const libraryItems = [
    { icon: History, label: 'History', path: '/history' },
    { icon: PlaySquare, label: 'Your videos', path: '/your-videos' },
    { icon: Clock, label: 'Watch later', path: '/watch-later' },
    { icon: ThumbsUp, label: 'Liked videos', path: '/liked' },
  ];

  return (
    <aside className="fixed left-0 top-14 h-full w-64 bg-youtube-gray border-r border-youtube-lightgray overflow-y-auto">
      <div className="p-3">
        {/* Main Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-youtube-lightgray text-youtube-text'
                  : 'text-youtube-textSecondary hover:bg-youtube-lightgray hover:text-youtube-text'
              }`}
            >
              <item.icon size={20} className="mr-6" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <hr className="my-4 border-youtube-lightgray" />

        {/* Library Section */}
        <div>
          <h3 className="px-3 py-2 text-sm font-medium text-youtube-textSecondary uppercase tracking-wide">
            Library
          </h3>
          <nav className="space-y-1">
            {libraryItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-youtube-lightgray text-youtube-text'
                    : 'text-youtube-textSecondary hover:bg-youtube-lightgray hover:text-youtube-text'
                }`}
              >
                <item.icon size={20} className="mr-6" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <hr className="my-4 border-youtube-lightgray" />

        {/* Subscriptions Section */}
        <div>
          <h3 className="px-3 py-2 text-sm font-medium text-youtube-textSecondary uppercase tracking-wide">
            Subscriptions
          </h3>
          <div className="space-y-1">
            {/* Sample subscription channels */}
            <div className="flex items-center px-3 py-2 rounded-lg hover:bg-youtube-lightgray transition-colors">
              <div className="w-6 h-6 bg-gray-500 rounded-full mr-6 flex-shrink-0"></div>
              <span className="text-sm text-youtube-textSecondary">Tech Channel</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-lg hover:bg-youtube-lightgray transition-colors">
              <div className="w-6 h-6 bg-gray-500 rounded-full mr-6 flex-shrink-0"></div>
              <span className="text-sm text-youtube-textSecondary">Music Channel</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-lg hover:bg-youtube-lightgray transition-colors">
              <div className="w-6 h-6 bg-gray-500 rounded-full mr-6 flex-shrink-0"></div>
              <span className="text-sm text-youtube-textSecondary">Gaming Channel</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 px-3 text-xs text-youtube-textSecondary">
          <p className="mb-2">About Press Copyright Contact us Creators</p>
          <p className="mb-2">Advertise Developers Terms Privacy Policy & Safety</p>
          <p className="mb-2">How YouTube works Test new features</p>
          <p>© 2024 ChrisTube</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;