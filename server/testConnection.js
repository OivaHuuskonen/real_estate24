import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log('DB connected');
    process.exit(0);
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });
