import 'colors';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import cors from 'cors';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import session from 'express-session';
// Load .env variables

import connectDB from './config/db.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Init express app
const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:8080",  // frontend origin, not '*'
    credentials: true,                 // allow cookies and credentials
}));
//https://studysync-frontend-4e14.onrender.com
app.use(express.json()); // Accept JSON
app.use(urlencoded({ extended: true })); // Handle form data
app.use(cookieParser()); // **CRUCIAL: Parse cookies before routes**
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        },
        store: process.env.NODE_ENV === 'production'
            ? new (require('connect-mongo')(session))({
                mongoUrl: process.env.MONGODB_URI
            })
            : null
    })
);
app.use(passport.initialize());
app.use(passport.session());
// Import passport config
import './config/passport.js';

// Placeholder: Import routes
import adminRoutes from './routes/adminRoutes.js';

import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import LeaderBoardRoutes from './routes/LeaderBoardRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import userRoutes from './routes/userRoutes.js';
// Mount Routes
app.use('/api/auth', authRoutes);//
app.use('/api/users', userRoutes);//
app.use('/api/admin', adminRoutes);
app.use('/api/file', fileRoutes);//
app.use('/api/ai', aiRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/search', searchRoutes);
app.use("/api/leaderboard", LeaderBoardRoutes);

// Health check route for Render
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is healthy!' });
});

// Middleware for 404 not found
import notFound from './middlewares/notFound.js';
app.use(notFound);

// Global error handler middleware
import passport from 'passport';
import errorHandler from './middlewares/errorMiddleware.js';
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:5000`);
});
