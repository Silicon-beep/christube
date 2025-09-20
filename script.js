// ChrisTube - Ad-Free YouTube Player
// Main JavaScript functionality

class ChrisTube {
    constructor() {
        this.player = null;
        this.isPlayerReady = false;
        this.apiFailure = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadYouTubeAPI();
    }

    setupEventListeners() {
        const loadBtn = document.getElementById('loadVideo');
        const urlInput = document.getElementById('videoUrl');

        loadBtn.addEventListener('click', () => this.loadVideo());
        
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.loadVideo();
            }
        });

        // Clear error when user starts typing
        urlInput.addEventListener('input', () => {
            this.hideError();
        });
    }

    loadYouTubeAPI() {
        // Load YouTube IFrame Player API
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.onerror = () => {
                console.warn('YouTube API failed to load, using fallback embed method');
                this.isPlayerReady = true; // Enable fallback mode
                this.apiFailure = true;
            };
            document.head.appendChild(script);
        }

        // YouTube API ready callback
        window.onYouTubeIframeAPIReady = () => {
            this.isPlayerReady = true;
            this.apiFailure = false;
            console.log('YouTube API loaded successfully');
        };

        // Timeout fallback in case API doesn't load
        setTimeout(() => {
            if (!this.isPlayerReady) {
                console.warn('YouTube API timeout, using fallback embed method');
                this.isPlayerReady = true;
                this.apiFailure = true;
            }
        }, 5000);
    }

    extractVideoId(url) {
        // YouTube URL patterns
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    }

    async loadVideo() {
        const urlInput = document.getElementById('videoUrl');
        const url = urlInput.value.trim();

        if (!url) {
            this.showError('Please enter a YouTube video URL');
            return;
        }

        const videoId = this.extractVideoId(url);
        if (!videoId) {
            this.showError('Invalid YouTube URL. Please check the URL and try again.');
            return;
        }

        this.hideError();
        this.showLoading();

        try {
            // Wait for YouTube API to be ready
            await this.waitForYouTubeAPI();
            
            // Get video info
            const videoInfo = await this.getVideoInfo(videoId);
            
            // Create or update player
            this.createPlayer(videoId);
            
            // Update video info display
            this.updateVideoInfo(videoInfo);

        } catch (error) {
            console.error('Error loading video:', error);
            this.showError('Failed to load video. Please check the URL and try again.');
            this.hideLoading();
        }
    }

    waitForYouTubeAPI() {
        return new Promise((resolve) => {
            if (this.isPlayerReady) {
                resolve();
            } else {
                const checkAPI = () => {
                    if (this.isPlayerReady) {
                        resolve();
                    } else {
                        setTimeout(checkAPI, 100);
                    }
                };
                checkAPI();
            }
        });
    }

    async getVideoInfo(videoId) {
        // Note: This is a simplified approach. In a production app, you'd want to use
        // the YouTube Data API with proper API keys for more detailed video information.
        // For now, we'll create a basic structure.
        
        return {
            title: 'Video Title', // Would be fetched from API
            description: 'Loading video information...',
            videoId: videoId
        };
    }

    createPlayer(videoId) {
        const playerContainer = document.getElementById('playerContainer');
        
        // Clear existing content
        playerContainer.innerHTML = '<div id="player"></div>';

        // Check if we should use fallback method
        if (this.apiFailure || !window.YT || !window.YT.Player) {
            this.createFallbackPlayer(videoId);
            return;
        }

        // Create YouTube player with ad-blocking parameters
        this.player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                // Parameters to minimize ads and improve experience
                'autoplay': 1,
                'controls': 1,
                'disablekb': 0,
                'enablejsapi': 1,
                'fs': 1,
                'iv_load_policy': 3, // Hide annotations
                'modestbranding': 1, // Reduce YouTube branding
                'playsinline': 1,
                'rel': 0, // Don't show related videos
                'showinfo': 0, // Hide video info
                'origin': window.location.origin
            },
            events: {
                'onReady': (event) => {
                    console.log('Player ready');
                    this.hideLoading();
                    this.updateVideoInfoFromPlayer();
                },
                'onError': (event) => {
                    console.error('Player error:', event.data);
                    this.handlePlayerError(event.data);
                    this.hideLoading();
                }
            }
        });
    }

    createFallbackPlayer(videoId) {
        const playerContainer = document.getElementById('playerContainer');
        
        console.log('Creating fallback player for video:', videoId);
        
        // Create direct iframe embed as fallback
        const iframe = document.createElement('iframe');
        iframe.id = 'player';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`;
        iframe.style.border = 'none';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        let loaded = false;
        
        iframe.onload = () => {
            console.log('Fallback player loaded successfully');
            loaded = true;
            this.hideLoading();
            this.updateVideoInfo({
                title: 'YouTube Video',
                description: `Video ID: ${videoId} (Fallback mode)`,
                videoId: videoId
            });
        };

        playerContainer.innerHTML = '';
        playerContainer.appendChild(iframe);
        
        // Timeout fallback in case iframe doesn't load or is blocked
        setTimeout(() => {
            if (!loaded) {
                console.log('Iframe timeout or blocked, showing direct link fallback');
                this.showDirectLinkFallback(videoId);
            }
        }, 5000);
    }

    updateVideoInfoFromPlayer() {
        if (this.player && this.player.getVideoData) {
            const videoData = this.player.getVideoData();
            if (videoData) {
                this.updateVideoInfo({
                    title: videoData.title || 'Unknown Title',
                    description: `Video ID: ${videoData.video_id}`,
                    videoId: videoData.video_id
                });
            }
        }
    }

    updateVideoInfo(info) {
        const videoInfoDiv = document.getElementById('videoInfo');
        const titleElement = document.getElementById('videoTitle');
        const descriptionElement = document.getElementById('videoDescription');

        titleElement.textContent = info.title;
        descriptionElement.textContent = info.description;
        
        videoInfoDiv.classList.remove('hidden');
    }

    handlePlayerError(errorCode) {
        let errorMessage = 'An error occurred while loading the video.';
        
        switch (errorCode) {
            case 2:
                errorMessage = 'Invalid video ID or video not found.';
                break;
            case 5:
                errorMessage = 'HTML5 player error. Please try again.';
                break;
            case 100:
                errorMessage = 'Video not found or has been removed.';
                break;
            case 101:
            case 150:
                errorMessage = 'Video cannot be embedded or is restricted.';
                break;
            default:
                errorMessage = `Player error (Code: ${errorCode}). Please try again.`;
        }
        
        this.showError(errorMessage);
    }

    showLoading() {
        const playerContainer = document.getElementById('playerContainer');
        playerContainer.innerHTML = `
            <div class="placeholder">
                <div class="loading"></div>
                <p>Loading video...</p>
            </div>
        `;
    }

    hideLoading() {
        // Loading will be hidden when player loads or error occurs
    }

    showDirectLinkFallback(videoId) {
        const playerContainer = document.getElementById('playerContainer');
        playerContainer.innerHTML = `
            <div class="fallback-container">
                <div class="fallback-icon">🎬</div>
                <h3>Direct Video Access</h3>
                <p>Due to network restrictions, the video cannot be embedded here.</p>
                <div class="fallback-links">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="youtube-link">
                        <span>📺</span> Watch on YouTube
                    </a>
                    <a href="https://youtu.be/${videoId}" target="_blank" class="youtube-link">
                        <span>🔗</span> Short Link
                    </a>
                </div>
                <p class="fallback-note">
                    <strong>Tip:</strong> For the best ad-free experience, consider using browser extensions like uBlock Origin.
                </p>
            </div>
        `;
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    hideError() {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.classList.add('hidden');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChrisTube();
});

// Handle API loading errors
window.addEventListener('error', (e) => {
    if (e.target.src && e.target.src.includes('youtube.com/iframe_api')) {
        console.error('Failed to load YouTube API');
        document.getElementById('errorMessage').textContent = 'Failed to load YouTube player. Please check your internet connection.';
        document.getElementById('errorMessage').classList.remove('hidden');
    }
});