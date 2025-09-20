import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from 'lucide-react';
import axios from 'axios';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  comment: string;
  timestamp: Date;
  likes: number;
}

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
    isSubscribed: boolean;
  };
  comments: Comment[];
}

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo({
          ...response.data.video,
          uploadDate: new Date(response.data.video.uploadDate),
          comments: response.data.video.comments.map((comment: any) => ({
            ...comment,
            timestamp: new Date(comment.timestamp)
          }))
        });
      } catch (err) {
        console.error('Error fetching video:', err);
        // Mock data fallback
        setVideo({
          id: parseInt(id || '1'),
          title: "Sample Video Title",
          description: "This is a sample video description that provides detailed information about the video content.",
          thumbnail: "https://via.placeholder.com/320x180/333/666?text=Video+Thumbnail",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          views: 12500,
          likes: 856,
          dislikes: 23,
          uploadDate: new Date('2024-01-15'),
          duration: "15:42",
          channel: {
            name: "Sample Channel",
            avatar: "https://via.placeholder.com/40x40/333/666?text=SC",
            subscribers: 125000,
            isSubscribed: false
          },
          comments: [
            {
              id: 1,
              user: "User123",
              avatar: "https://via.placeholder.com/32x32/333/666?text=U1",
              comment: "Great video! Thanks for sharing.",
              timestamp: new Date('2024-01-16'),
              likes: 5
            },
            {
              id: 2,
              user: "VideoLover",
              avatar: "https://via.placeholder.com/32x32/333/666?text=VL",
              comment: "This is exactly what I was looking for!",
              timestamp: new Date('2024-01-16'),
              likes: 12
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:5000/api/videos/${id}/like`);
      setIsLiked(!isLiked);
      if (isDisliked) setIsDisliked(false);
    } catch (err) {
      console.error('Error liking video:', err);
    }
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/videos/${id}/comment`, {
        comment: newComment
      });
      
      if (video) {
        setVideo({
          ...video,
          comments: [response.data.comment, ...video.comments]
        });
      }
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatSubscribers = (subscribers: number) => {
    if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1)}M`;
    } else if (subscribers >= 1000) {
      return `${(subscribers / 1000).toFixed(1)}K`;
    }
    return subscribers.toString();
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="w-full h-96 bg-youtube-lightgray rounded mb-4"></div>
          <div className="h-6 bg-youtube-lightgray rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-youtube-lightgray rounded mb-4 w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center h-64 text-youtube-textSecondary">
        <p>Video not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player Section */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg overflow-hidden mb-4">
            <video
              src={video.videoUrl}
              width="100%"
              height="500px"
              controls
              className="w-full h-[500px] object-cover"
              poster={video.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-youtube-text mb-2">{video.title}</h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-youtube-textSecondary text-sm">
                {formatViews(video.views)} views • {video.uploadDate.toLocaleDateString()}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                    isLiked ? 'bg-youtube-red text-white' : 'bg-youtube-lightgray hover:bg-gray-600'
                  }`}
                >
                  <ThumbsUp size={16} />
                  <span className="text-sm">{video.likes}</span>
                </button>
                
                <button
                  onClick={handleDislike}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                    isDisliked ? 'bg-youtube-red text-white' : 'bg-youtube-lightgray hover:bg-gray-600'
                  }`}
                >
                  <ThumbsDown size={16} />
                  <span className="text-sm">{video.dislikes}</span>
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-2 bg-youtube-lightgray hover:bg-gray-600 rounded-full transition-colors">
                  <Share size={16} />
                  <span className="text-sm">Share</span>
                </button>
                
                <button className="flex items-center space-x-1 px-3 py-2 bg-youtube-lightgray hover:bg-gray-600 rounded-full transition-colors">
                  <Download size={16} />
                  <span className="text-sm">Download</span>
                </button>
                
                <button className="p-2 bg-youtube-lightgray hover:bg-gray-600 rounded-full transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-center justify-between bg-youtube-gray p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={video.channel.avatar}
                  alt={video.channel.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-youtube-text">{video.channel.name}</h3>
                  <p className="text-youtube-textSecondary text-sm">
                    {formatSubscribers(video.channel.subscribers)} subscribers
                  </p>
                </div>
              </div>
              
              <button className="px-6 py-2 bg-youtube-red hover:bg-youtube-darkred text-white rounded-full transition-colors">
                {video.channel.isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Description */}
            <div className="mt-4 bg-youtube-gray p-4 rounded-lg">
              <p className="text-youtube-text whitespace-pre-wrap">{video.description}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-youtube-text mb-4">
              {video.comments.length} Comments
            </h3>

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="flex space-x-3">
                <img
                  src="https://via.placeholder.com/32x32/333/666?text=You"
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-youtube-lightgray focus:border-youtube-red outline-none resize-none text-youtube-text placeholder-youtube-textSecondary"
                    rows={2}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setNewComment('')}
                      className="px-4 py-2 text-youtube-textSecondary hover:bg-youtube-lightgray rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-youtube-red hover:bg-youtube-darkred disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {video.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-youtube-text text-sm">{comment.user}</span>
                      <span className="text-youtube-textSecondary text-xs">
                        {comment.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-youtube-text text-sm mb-2">{comment.comment}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-youtube-textSecondary hover:text-youtube-text">
                        <ThumbsUp size={14} />
                        <span className="text-xs">{comment.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-youtube-textSecondary hover:text-youtube-text">
                        <ThumbsDown size={14} />
                      </button>
                      <button className="text-youtube-textSecondary hover:text-youtube-text text-xs">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-youtube-text">Up next</h3>
          {/* This would be populated with related videos */}
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex space-x-2 p-2 hover:bg-youtube-lightgray rounded transition-colors">
                <div className="w-40 h-24 bg-youtube-lightgray rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-3 bg-youtube-lightgray rounded mb-1"></div>
                  <div className="h-2 bg-youtube-lightgray rounded mb-1 w-3/4"></div>
                  <div className="h-2 bg-youtube-lightgray rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;