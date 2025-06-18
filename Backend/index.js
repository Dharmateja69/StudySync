import 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';

import MongoStore from 'connect-mongo'; // ✅ Correct ESM import for connect-mongo
import connectDB from './config/db.js';
import './config/passport.js'; // Configures passport strategies
// ✅ Create Mongo session store

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Init express app
const app = express();

// === MIDDLEWARE ===

// Enable CORS with frontend origin
// Enable CORS with all necessary options
app.use(cors({
    origin: "https://studysync-frontend-4e14.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Add allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],     // ✅ Add allowed headers
}));

// ✅ Explicitly handle preflight requests


// Accept JSON and form data
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Express session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
    store: process.env.NODE_ENV === 'production'
        ? new MongoStore({
            mongoUrl: process.env.MONGODB_URI,
        })
        : undefined, // In development, memory store is fine
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// === ROUTES ===
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import LeaderBoardRoutes from './routes/LeaderBoardRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/leaderboard', LeaderBoardRoutes);

// === HEALTH CHECK ===
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is healthy!' });
});

// === ERROR HANDLERS ===
import errorHandler from './middlewares/errorMiddleware.js';
import notFound from './middlewares/notFound.js';
app.use(notFound);
app.use(errorHandler);

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on https://studysync-backend-7iry.onrender.com/`.cyan.bold);
});
