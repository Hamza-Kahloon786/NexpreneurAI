const passport      = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User           = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // Find existing user by googleId or email
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value;
          user = await User.findOne({ email });

          if (user) {
            // Merge Google ID into existing local account
            user.googleId = profile.id;
            user.provider  = 'google';
            if (!user.avatar) user.avatar = profile.photos?.[0]?.value;
            await user.save();
          } else {
            // Create new Google user
            user = await User.create({
              name:     profile.displayName,
              email:    profile.emails?.[0]?.value,
              googleId: profile.id,
              avatar:   profile.photos?.[0]?.value,
              provider: 'google',
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
