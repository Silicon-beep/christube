# ChrisTube - Ad-Free YouTube Player

A simple, clean web application that allows you to watch YouTube videos without ads.

## Features

- 🚫 **Ad-Free Experience**: Watch YouTube videos without interruptions
- 🎬 **Clean Interface**: Simple, modern design focused on content
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔗 **Easy URL Input**: Just paste any YouTube URL and start watching
- ⚡ **Fast Loading**: Minimal overhead for quick video loading

## Supported URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Quick Start

### Option 1: Using Node.js (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Option 2: Using Python (Alternative)

1. **Start a simple HTTP server:**
   ```bash
   npm run serve
   ```

2. **Open your browser:**
   Navigate to `http://localhost:8000`

### Option 3: Direct File Opening

Simply open `index.html` in your web browser. Note that some features may not work due to CORS restrictions.

## How to Use

1. Open the application in your web browser
2. Paste a YouTube video URL in the input field
3. Click the "Watch" button or press Enter
4. Enjoy ad-free video playback!

## Technical Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **YouTube Integration**: YouTube IFrame Player API
- **Server**: Express.js (Node.js) or Python HTTP server
- **Ad Blocking**: Uses specific YouTube API parameters to minimize ads

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Development

The project structure is simple:

```
christube/
├── index.html          # Main application page
├── style.css          # Styling and responsive design
├── script.js          # Core JavaScript functionality
├── server.js          # Express server for hosting
├── package.json       # Node.js dependencies and scripts
└── README.md          # This file
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This application uses YouTube's public APIs and embedding features. It respects YouTube's terms of service while providing a cleaner viewing experience. The effectiveness of ad-blocking may vary depending on YouTube's current policies and implementation.