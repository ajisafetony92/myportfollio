const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.warn('⚠️  Server running without database. Database features will not work.');
  }
};

// Connect to database
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Loan App Server is Running!' });
});

// Test route to check DB connection
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/loans', require('./routes/loans'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
