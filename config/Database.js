import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`\nMonhgoDb Connected !! DB HOST : ${connectionDB.connection.host}`);
  } catch (err) {
    console.error('MongoDB Connection Failed!', err);
    process.exit(1);
  }
};
