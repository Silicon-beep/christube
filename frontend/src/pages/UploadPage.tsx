import React, { useState } from 'react';
import { Upload, Film } from 'lucide-react';
import axios from 'axios';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
      } else {
        alert('Please upload a video file');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      alert('Please provide both a video file and title');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      alert('Video uploaded successfully!');
      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-youtube-text mb-2">Upload Video</h1>
        <p className="text-youtube-textSecondary">Share your content with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-youtube-red bg-youtube-red bg-opacity-10'
              : 'border-youtube-lightgray hover:border-youtube-red'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="space-y-4">
              <Film size={48} className="mx-auto text-youtube-red" />
              <div>
                <p className="text-youtube-text font-medium">{file.name}</p>
                <p className="text-youtube-textSecondary text-sm">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-youtube-red hover:underline"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload size={48} className="mx-auto text-youtube-textSecondary" />
              <div>
                <p className="text-youtube-text font-medium mb-2">
                  Drag and drop your video file here
                </p>
                <p className="text-youtube-textSecondary text-sm mb-4">
                  Or click to browse files
                </p>
                <label className="inline-block px-6 py-3 bg-youtube-red hover:bg-youtube-darkred text-white rounded-lg cursor-pointer transition-colors">
                  Select Video File
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="bg-youtube-gray p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-youtube-text">Uploading...</span>
              <span className="text-youtube-textSecondary">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-youtube-lightgray rounded-full h-2">
              <div
                className="bg-youtube-red h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Video Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-youtube-text font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className="w-full px-4 py-3 bg-youtube-gray border border-youtube-lightgray rounded-lg focus:outline-none focus:border-youtube-red text-youtube-text placeholder-youtube-textSecondary"
                required
              />
            </div>

            <div>
              <label className="block text-youtube-text font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your video"
                rows={6}
                className="w-full px-4 py-3 bg-youtube-gray border border-youtube-lightgray rounded-lg focus:outline-none focus:border-youtube-red text-youtube-text placeholder-youtube-textSecondary resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-youtube-text font-medium mb-2">
                Thumbnail
              </label>
              <div className="border-2 border-dashed border-youtube-lightgray rounded-lg p-6 text-center">
                <p className="text-youtube-textSecondary">
                  Thumbnail will be auto-generated
                </p>
              </div>
            </div>

            <div>
              <label className="block text-youtube-text font-medium mb-2">
                Visibility
              </label>
              <select className="w-full px-4 py-3 bg-youtube-gray border border-youtube-lightgray rounded-lg focus:outline-none focus:border-youtube-red text-youtube-text">
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 text-youtube-textSecondary hover:bg-youtube-lightgray rounded-lg transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={!file || !title.trim() || uploading}
            className="px-8 py-3 bg-youtube-red hover:bg-youtube-darkred disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {uploading ? 'Uploading...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;