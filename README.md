# ChrisTube - YouTube Clone

A full-stack YouTube-like video platform built with React, Node.js, and modern web technologies.

## 🚀 Features

- **Video Upload & Streaming**: Upload and watch videos with a responsive player
- **User Authentication**: Register, login, and manage user accounts
- **Interactive Features**: Like, dislike, comment, and subscribe functionality
- **Responsive Design**: YouTube-like UI that works on all devices
- **Search Functionality**: Find videos by title and description
- **User Profiles**: Channel pages with video management
- **Real-time Updates**: Live interaction updates

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Player** for video playback
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **JWT** for authentication
- **Multer** for file uploads
- **CORS** enabled
- **Rate limiting** and security middleware
- **Morgan** for logging

## 📁 Project Structure

```
christube/
├── backend/                 # Node.js/Express API
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── models/            # Data models
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── uploads/               # Video upload directory
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd christube
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

### Manual Setup

If you prefer to run servers separately:

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 🎯 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-all` - Install dependencies for both projects
- `npm run backend` - Start only the backend server
- `npm run frontend` - Start only the frontend server

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database (future implementation)
MONGODB_URI=mongodb://localhost:27017/christube

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# File upload settings
MAX_FILE_SIZE=500000000
UPLOAD_PATH=../uploads
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Videos
- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get single video
- `POST /api/videos/upload` - Upload new video
- `POST /api/videos/:id/like` - Like a video
- `POST /api/videos/:id/comment` - Add comment

### Users
- `GET /api/users/:id` - Get user profile
- `POST /api/users/:id/subscribe` - Subscribe to user
- `DELETE /api/users/:id/subscribe` - Unsubscribe from user

## 🎨 UI Components

### Layout Components
- **Header**: Navigation with search, user menu
- **Sidebar**: Navigation menu with categories
- **VideoCard**: Individual video preview
- **VideoGrid**: Grid layout for video listings

### Pages
- **HomePage**: Main video feed
- **VideoPage**: Video player with comments
- **UploadPage**: Video upload interface
- **LoginPage/SignupPage**: Authentication
- **ProfilePage**: User channel page

## 🚀 Features in Development

- [ ] Database integration (MongoDB)
- [ ] Video processing and thumbnails
- [ ] Search functionality
- [ ] Recommendation system
- [ ] Playlist management
- [ ] Live streaming
- [ ] Mobile app
- [ ] Admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by YouTube's interface and functionality
- Built with modern React and Node.js best practices
- UI components styled with Tailwind CSS
- Icons provided by Lucide React

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Happy coding! 🎉**