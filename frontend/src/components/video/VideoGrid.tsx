import React from 'react';
import VideoCard from './VideoCard';

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

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-youtube-gray rounded-lg overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-youtube-lightgray"></div>
            <div className="p-3">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-youtube-lightgray rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-youtube-lightgray rounded mb-2"></div>
                  <div className="h-3 bg-youtube-lightgray rounded mb-1 w-3/4"></div>
                  <div className="h-3 bg-youtube-lightgray rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-youtube-textSecondary">
        <p>No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;