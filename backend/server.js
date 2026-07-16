const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config({ quiet: true });
const db = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',

  'https://sivion-global.vercel.app',
  'https://sivionglobaltechnologies.com',
  'https://www.sivionglobaltechnologies.com',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Helmet (security headers) – disable CSP and allow cross-origin resources for local dev
app.use(helmet({ 
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const path = require('path');

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'SiviOn Global Technologies API is running' });
});

// Serve static files from the frontend public directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'frontend', 'public', 'uploads')));

// Import Routes
const contactRoutes = require('./routes/contactRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const careerRoutes = require('./routes/careerRoutes');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const authRoutes = require('./routes/authRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const jobPositionRoutes = require('./routes/jobPositionRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/positions', jobPositionRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(PORT);

server.on('listening', () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Test Database Connection
  db.query('SELECT NOW()')
    .then(() => {
      console.log('Database connection verified successfully.');
    })
    .catch((err) => {
      console.error('Database connection failed on startup:', err);
    });
});

server.on('error', (err) => {
  console.error(`Server failed to start on port ${PORT}:`, err.message);
});

