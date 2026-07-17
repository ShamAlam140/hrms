
const express = require('express');
// const passport = require('passport');
const EmpSchema= require('../Schemas/employee')
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwtkey = process.env.JWT_KEY
// Continue with Passport.js configuration...
const frontend = process.env.FRONTEND_URL || 'http://localhost:5173'
passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user ID into the session
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await EmpSchema.findById(id);
      done(null, user); // Deserialize user from the session
    } catch (error) {
      done(error);
    }
  });


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
    // scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    // Check if user exists in your database by email
    try {
        
        const normalizedEmail = profile.emails[0].value.toLowerCase();
        
      const user = await EmpSchema.findOne({ email:normalizedEmail });
    // 
      done(null, user); // Pass the user to the next middleware
    } catch (error) {
      done(error);
    }
  }));
   
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth 2.0 callback route
router.get('/google/callback',
  passport.authenticate('google' ,
  {successRedirect: `${frontend}/dashboard`},
//   { failureRedirect: '/login' }
),
  (req, res) => {
    // 
    // Redirect or respond with token after successful Google OAuth 2.0 authentication
    const token = jwt.sign({ userId: req.user._id }, jwtkey, {
      expiresIn: '24h', // Token expiration time
    });
    res.status(200).json({ token, user: req.user });
    // res.redirect('/dashboard');
  }
);





  router.get('/login/success', async(req,res)=>{
    try {
        
        res.status(200).json(req.user)
    } catch (error) {
        
    }
})


module.exports = router;