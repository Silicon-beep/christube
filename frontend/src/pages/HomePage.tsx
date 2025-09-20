import React, { useState, useEffect } from 'react';
import VideoGrid from '../components/video/VideoGrid';
import axios from 'axios';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: Date;
  duration: string;
  channel: {
    name: string;
    avatar: string;
    subscribers: number;
  };
}

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos');
        setVideos(response.data.videos.map((video: any) => ({
          ...video,
          uploadDate: new Date(video.uploadDate)
        })));
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos');
        // Use mock data as fallback
        setVideos([
          {
            id: 1,
            title: "How to Build a YouTube Clone with React and Node.js",
            description: "Learn to create a full-stack YouTube clone using modern web technologies.",
            thumbnail: "https://via.placeholder.com/320x180/ff0000/ffffff?text=Video+1",
            videoUrl: "/uploads/video1.mp4",
            views: 12500,
            likes: 856,
            dislikes: 23,
            uploadDate: new Date('2024-01-15'),
            duration: "15:42",
            channel: {
              name: "TechTutorials",
              avatar: "https://via.placeholder.com/40x40/333/666?text=TT",
              subscribers: 125000
            }
          },
          {
            id: 2,
            title: "Amazing Sunset Timelapse in 4K",
            description: "Beautiful sunset captured over the mountains in stunning 4K resolution.",
            thumbnail: "https://via.placeholder.com/320x180/ff6600/ffffff?text=Video+2",
            videoUrl: "/uploads/video2.mp4",
            views: 45600,
            likes: 2300,
            dislikes: 45,
            uploadDate: new Date('2024-01-14'),
            duration: "3:25",
            channel: {
              name: "NatureFilms",
              avatar: "https://via.placeholder.com/40x40/333/666?text=NF",
              subscribers: 89000
            }
          },
          {
            id: 3,
            title: "Best JavaScript ES6+ Features You Should Know",
            description: "Explore the most useful ES6+ features that every JavaScript developer should master.",
            thumbnail: "https://via.placeholder.com/320x180/f7df1e/000000?text=Video+3",
            videoUrl: "/uploads/video3.mp4",
            views: 23400,
            likes: 1200,
            dislikes: 34,
            uploadDate: new Date('2024-01-13'),
            duration: "22:18",
            channel: {
              name: "CodeMaster",
              avatar: "https://via.placeholder.com/40x40/333/666?text=CM",
              subscribers: 234000
            }
          },
          {
            id: 4,
            title: "Cooking the Perfect Pasta - Italian Style",
            description: "Learn the secrets of authentic Italian pasta cooking from a professional chef.",
            thumbnail: "https://via.placeholder.com/320x180/00ff00/ffffff?text=Video+4",
            videoUrl: "/uploads/video4.mp4",
            views: 67800,
            likes: 3400,
            dislikes: 78,
            uploadDate: new Date('2024-01-12'),
            duration: "12:05",
            channel: {
              name: "ChefMario",
              avatar: "https://via.placeholder.com/40x40/333/666?text=CM",
              subscribers: 456000
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (error && videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-youtube-textSecondary">
        <div className="text-center">
          <p className="text-lg mb-2">Failed to load videos</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-youtube-red text-white rounded hover:bg-youtube-darkred transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <div className="mb-6 px-4">
        <h1 className="text-2xl font-bold text-youtube-text">Recommended</h1>
      </div>
      <VideoGrid videos={videos} loading={loading} />
    </div>
  );
};

export default HomePage;