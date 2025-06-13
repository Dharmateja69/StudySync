import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../Model/User.js';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    scope: ['profile', 'email'],
    accessType: 'offline'
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Extract user info directly from profile
        const googleId = profile.id;
        const email = profile.emails && profile.emails[0]?.value;
        const fullName = profile.displayName;
        const avatar = profile.photos && profile.photos[0]?.value;

        if (!email) {
            // Handle case where email is not provided
            return done(new Error('No email found in Google profile'), null);
        }

        // Find or create user
        const user = await User.findOneAndUpdate(
            { email },
            {
                $setOnInsert: {
                    fullName,
                    avatar,
                    isVerified: true
                },
                $set: {
                    googleId // update or set googleId every time user logs in
                }
            },
            {
                upsert: true,
                new: true,
                runValidators: true
            }
        );


        done(null, user);
    } catch (err) {
        console.error('Google Auth Error:', err);
        done(err, null);
    }
}));

// Session Serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
export default passport;