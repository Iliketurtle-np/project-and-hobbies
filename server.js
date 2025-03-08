const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure the public/images directory exists
const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}



// Path to the appointments JSON file
const appointmentsFile = path.join(__dirname, 'appointments.json');

// Helper function to read appointments from the JSON file
function readAppointments() {
  const data = fs.readFileSync(appointmentsFile, 'utf8');
  return JSON.parse(data);
}

// Helper function to write appointments to the JSON file
function writeAppointments(appointments) {
  fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2), 'utf8');
}
app.get('/api/appointments', (req, res) => {
  try {
    const appointments = readAppointments();
    res.json(appointments);
  } catch (error) {
    console.error('Error reading appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Schedule a new appointment
app.post('/api/appointments', (req, res) => {
  const { title, start, end } = req.body;

  // Validate input
  if (!title || !start || !end) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Read existing appointments
    const appointments = readAppointments();

    // Check for conflicts
    const conflict = appointments.find(
      (appointment) =>
        (new Date(start) < new Date(appointment.end)) &&
        (new Date(end) > new Date(appointment.start))
    );

    if (conflict) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    // Add the new appointment
    const newAppointment = { title, start, end };
    appointments.push(newAppointment);

    // Write updated appointments back to the file
    writeAppointments(appointments);

    res.json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ error: 'Failed to schedule appointment' });
  }
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    // Read the contents of the images directory
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error('Error reading images directory:', err);
        return cb(err);
      }

      // Filter files that start with "photo" and extract their numbers
      const photoFiles = files.filter((f) => f.startsWith('photo'));
      const photoCount = photoFiles.length;

      // Generate a new filename (e.g., photo8.jpg, photo9.jpg)
      const newFileName = `photo${photoCount + 1}${path.extname(file.originalname)}`;
      cb(null, newFileName);
    });
  },
});
const upload = multer({ storage });

// Upload Endpoint
app.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'File upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('File received:', req.file);
    res.json({ message: 'File uploaded successfully', file: req.file });
  });
});

// List Images Endpoint
app.get('/images', (req, res) => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error reading images directory:', err);
      return res.status(500).json({ error: 'Unable to read images directory' });
    }
    res.json(files);
  });
});


// **********************************WISHLIST*****************************************************************



// Path to the wishlist JSON file
const wishlistFile = path.join(__dirname, 'wishlist.json');

// Helper function to read wishlist items
function readWishlist() {
  if (!fs.existsSync(wishlistFile)) {
    fs.writeFileSync(wishlistFile, JSON.stringify([]), 'utf8');
  }
  const data = fs.readFileSync(wishlistFile, 'utf8');
  return JSON.parse(data);
}

// Helper function to write wishlist items
function writeWishlist(items) {
  fs.writeFileSync(wishlistFile, JSON.stringify(items, null, 2), 'utf8');
}

// Get all wishlist items
app.get('/api/wishlist', (req, res) => {
  try {
    const items = readWishlist();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// Add a new wishlist item
app.post('/api/wishlist', (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ error: 'Item is required' });
  }

  try {
    const items = readWishlist();
    items.push(item);
    writeWishlist(items);
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});


// Serve Static Files
app.use(express.static(publicDir));

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


