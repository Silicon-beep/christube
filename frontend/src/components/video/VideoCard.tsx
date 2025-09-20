import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface VideoCardProps {
  video: {
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
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="bg-youtube-gray rounded-lg overflow-hidden hover:bg-youtube-lightgray transition-colors duration-200">
      <Link to={`/watch/${video.id}`} className="block">
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/320x180/333/666?text=Video+Thumbnail';
            }}
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </span>
        </div>
      </Link>
      
      <div className="p-3">
        <div className="flex space-x-3">
          <Link to={`/profile/${video.channel.name}`} className="flex-shrink-0">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/40x40/333/666?text=Avatar';
              }}
            />
          </Link>
          
          <div className="flex-1 min-w-0">
            <Link to={`/watch/${video.id}`}>
              <h3 className="text-sm font-medium text-youtube-text line-clamp-2 hover:text-gray-300 transition-colors">
                {video.title}
              </h3>
            </Link>
            
            <Link 
              to={`/profile/${video.channel.name}`}
              className="text-youtube-textSecondary text-xs hover:text-gray-300 transition-colors"
            >
              {video.channel.name}
            </Link>
            
            <div className="text-youtube-textSecondary text-xs mt-1">
              <span>{formatViews(video.views)} views</span>
              <span className="mx-1">•</span>
              <span>{formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;