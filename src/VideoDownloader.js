import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://project-and-hobbies.onrender.com'; // Replace with your Render backend URL

function VideoDownloader() {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadedVideo, setDownloadedVideo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/download-tiktok`, { videoUrl });
      setDownloadedVideo(response.data.downloadUrl);
    } catch (error) {
      console.error('Error downloading video:', error);
      alert('Failed to download video. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Video Downloader</h2>

      {/* Form to Input Video URL */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter TikTok video URL..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Download Video
        </button>
      </form>

      {/* Display Downloaded Video */}
      {downloadedVideo && (
        <div style={styles.videoContainer}>
          <h3>Downloaded Video</h3>
          <video controls width="600" style={styles.video}>
            <source src={downloadedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

// Inline styles for simplicity (you can use CSS or styled-components instead)
const styles = {
  container: { textAlign: 'center', padding: '20px' },
  form: { marginBottom: '20px' },
  input: {
    padding: '10px',
    marginRight: '10px',
    width: 'calc(50% - 10px)',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  videoContainer: { marginTop: '20px' },
  video: { margin: '20px auto', display: 'block' },
};

export default VideoDownloader;