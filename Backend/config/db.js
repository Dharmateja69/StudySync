import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

/**
 * Connects to MongoDB using Mongoose
 */
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MONGODB_URI not found in environment variables');
        }

        const conn = await connect(uri); // No need for deprecated options

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
