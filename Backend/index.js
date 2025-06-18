import 'colors';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import connectDB from './config/db.js';
import './config/passport.js'; // Passport strategies

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();


// Init express app
const app = express();

// === CORS CONFIGURATION (MUST BE FIRST) ===
const corsOptions = {
    origin: ["https://studysync-frontend-4e14.onrender.com"], // Add localhost for development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin"
    ],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200 // For legacy browser support
};

// ✅ Apply CORS to all routes FIRST
app.use(cors(corsOptions));
app.use(morgan('dev'));


// ✅ Explicitly handle all preflight OPTIONS requests
// app.options('*', cors(corsOptions));

// === OTHER MIDDLEWARES ===

// ✅ Accept JSON and form data
app.use(express.json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));

// ✅ Parse cookies
app.use(cookieParser());

// ✅ Express session config
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
        ? new MongoStore({ mongoUrl: process.env.MONGODB_URI })
        : undefined,
}));

// ✅ Passport initialization
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
app.use((req, res, next) => {
    console.log("⛔ Request hit:", req.method, req.path);
    next();
});
// === ERROR HANDLERS ===
import errorHandler from './middlewares/errorMiddleware.js';
import notFound from './middlewares/notFound.js';
app.use(notFound);
app.use(errorHandler);

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on https://studysync-backend-9obr.onrender.com`.cyan.bold);
});