import mongoose from 'mongoose';

export async function connect() {
  const DB_URI = process.env.DB_URL || 'mongodb://localhost:27017/nextjs-mongodb';
  try {
    await mongoose.connect(DB_URI);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit(1); // Exit with a non-zero code to indicate an error
    });

  } catch (error) {
    console.log('Something went wrong!');
    console.error(error);
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
}
