import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Settings, Users, Video } from 'lucide-react';
import VideoGrid from '../components/video/VideoGrid';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  subscribers: number;
  subscribedTo: number;
  joinDate: Date;
  videos: Array<{
    id: number;
    title: string;
    thumbnail: string;
    views: number;
    uploadDate: Date;
  }>;
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser({
          ...response.data.user,
          joinDate: new Date(response.data.user.joinDate),
          videos: response.data.user.videos.map((video: any) => ({
            ...video,
            uploadDate: new Date(video.uploadDate)
          }))
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        // Mock data fallback
        setUser({
          id: parseInt(id || '1'),
          username: 'SampleUser',
          email: 'sample@example.com',
          avatar: 'https://via.placeholder.com/120x120/333/666?text=User',
          subscribers: 15400,
          subscribedTo: 87,
          joinDate: new Date('2023-01-15'),
          videos: [
            {
              id: 1,
              title: 'My First Video',
              thumbnail: 'https://via.placeholder.com/320x180/333/666?text=Video+1',
              views: 2500,
              uploadDate: new Date('2024-01-10')
            },
            {
              id: 2,
              title: 'Tutorial: How to Code',
              thumbnail: 'https://via.placeholder.com/320x180/333/666?text=Video+2',
              views: 8900,
              uploadDate: new Date('2024-01-05')
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const formatSubscribers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-48 bg-youtube-lightgray rounded-lg mb-6"></div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-32 h-32 bg-youtube-lightgray rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-youtube-lightgray rounded w-48"></div>
              <div className="h-4 bg-youtube-lightgray rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64 text-youtube-textSecondary">
        <p>User not found</p>
      </div>
    );
  }

  // Convert user videos to the format expected by VideoGrid
  const videosForGrid = user.videos.map(video => ({
    ...video,
    description: '',
    videoUrl: '',
    likes: 0,
    dislikes: 0,
    duration: '0:00',
    channel: {
      name: user.username,
      avatar: user.avatar,
      subscribers: user.subscribers
    }
  }));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-youtube-red to-youtube-darkred rounded-lg mb-6"></div>

      {/* Profile Info */}
      <div className="px-6 mb-8">
        <div className="flex items-start space-x-6">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-32 h-32 rounded-full border-4 border-youtube-gray"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-youtube-text mb-2">{user.username}</h1>
            
            <div className="flex items-center space-x-6 text-youtube-textSecondary mb-4">
              <span>{formatSubscribers(user.subscribers)} subscribers</span>
              <span>{user.videos.length} videos</span>
              <span>Joined {user.joinDate.toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2 bg-youtube-red hover:bg-youtube-darkred text-white rounded-full transition-colors">
                Subscribe
              </button>
              <button className="p-2 hover:bg-youtube-lightgray rounded-full transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-youtube-lightgray px-6 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'videos'
                ? 'border-youtube-red text-youtube-text'
                : 'border-transparent text-youtube-textSecondary hover:text-youtube-text'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Video size={16} />
              <span>Videos</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'about'
                ? 'border-youtube-red text-youtube-text'
                : 'border-transparent text-youtube-textSecondary hover:text-youtube-text'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>About</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="px-6">
        {activeTab === 'videos' && (
          <div>
            {user.videos.length > 0 ? (
              <VideoGrid videos={videosForGrid} />
            ) : (
              <div className="flex items-center justify-center h-64 text-youtube-textSecondary">
                <div className="text-center">
                  <Video size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No videos uploaded yet</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl">
            <div className="bg-youtube-gray p-6 rounded-lg">
              <h3 className="text-lg font-medium text-youtube-text mb-4">About {user.username}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-youtube-text mb-2">Stats</h4>
                  <div className="space-y-2 text-youtube-textSecondary">
                    <div className="flex justify-between">
                      <span>Subscribers:</span>
                      <span>{formatSubscribers(user.subscribers)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total videos:</span>
                      <span>{user.videos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Joined:</span>
                      <span>{user.joinDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-youtube-text mb-2">Description</h4>
                  <p className="text-youtube-textSecondary">
                    Welcome to my channel! I create content about various topics and hope you enjoy watching my videos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;