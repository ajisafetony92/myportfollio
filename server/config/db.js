const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.warn('⚠️  Server running without database. Database features will not work.');
  }
};

module.exports = connectDB;