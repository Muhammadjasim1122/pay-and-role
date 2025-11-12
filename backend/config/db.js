const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/frappe-hr';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error(`Make sure MongoDB is running at ${uri}`);
    }

    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
