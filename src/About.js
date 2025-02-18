import React, { useEffect, useState } from 'react';
import './About.css'; // Import a CSS file for styling
import 'react-image-lightbox/style.css'; // Import the lightbox styles
import Lightbox from 'react-image-lightbox';
import axios from 'axios';

const API_BASE_URL = 'https://project-and-hobbies.onrender.com'; // Backend server URL

function About() {
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Controls whether the lightbox is open
  const [photoIndex, setPhotoIndex] = useState(0); // Tracks the currently displayed photo

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/images`); // Fetch list of images from the backend
        setPhotos(response.data.map((file) => ({
          src: `${API_BASE_URL}/images/${file}`, // Use the backend URL for images
          caption: file,
        })));
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    };
    loadPhotos();
  }, []);
  

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data.message);
  
      // Reload the photos after uploading
      const newPhoto = { src: `${API_BASE_URL}/images/${response.data.file.filename}`, caption: response.data.file.filename };
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About Me</h1>
        <p>Welcome to my portfolio where I share my passion for capturing moments.</p>
      </header>

      {/* Ambition & Dreams Section */}
      <section className="about-content">
        <div className="about-text">
          <h2>My Ambition & Dreams</h2>
          <p>I’m working toward becoming a fullstack developer with a focus on AI.</p>
          <p>As a fullstack developer, I’d have the skills to build complete systems.</p>
          <p>Imagine apps that help doctors diagnose patients faster or tools that improve accessibility.</p>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="photo-gallery">
        <h2>My Photography</h2>
        <label htmlFor="image-upload" className="custom-file-upload">
          Upload Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }} // Hide the default input
        />
        <div className="gallery-container">
          {photos.map((photo, index) => (
            <div
              className="polaroid"
              key={index}
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300"; // Fallback image
                }}
              />
              <p>{photo.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && photos.length > 0 && (
        <Lightbox
          mainSrc={photos[photoIndex]?.src || "https://via.placeholder.com/800"}
          nextSrc={photos[(photoIndex + 1) % photos.length]?.src || "https://via.placeholder.com/800"}
          prevSrc={photos[(photoIndex - 1 + photos.length) % photos.length]?.src || "https://via.placeholder.com/800"}
          onCloseRequest={() => {
            setIsOpen(false);
            setTimeout(() => {
              setPhotoIndex(0); // Reset to the first photo after a short delay
            }, 100);
          }}
          onMovePrevRequest={() =>
            setPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)
          }
          imageCaption={photos[photoIndex]?.caption || "No Caption Available"}
        />
      )}

      {/* Footer Section */}
      <footer className="about-footer">
        <button className="cta-button">Contact Us</button>
      </footer>
    </div>
  );
}

export default About;