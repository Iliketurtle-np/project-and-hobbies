const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'public', 'images');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create the directory if it doesn't exist
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename (e.g., photo7.jpg, photo8.jpg)
    const files = fs.readdirSync(path.join(__dirname, 'public', 'images'));
    const photoCount = files.filter((file) => file.startsWith('photo')).length;
    const newFileName = `photo${photoCount + 1}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// Upload Endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  console.log('File received:', req.file); // Debugging line
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// List Images Endpoint
app.get('/images', (req, res) => {
  const dir = path.join(__dirname, 'public', 'images');
  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read images directory' });
    }
    res.json(files);
  });
});

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});