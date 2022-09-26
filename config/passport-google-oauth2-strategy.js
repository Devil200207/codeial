const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new strategy for google login
passport.use(new googleStrategy(
    {
        clientID:"1046015082162-fru1tgtt4liphiv44333p8sngejsppa7.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refeshToken,profile,done)
    {
        // find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user)
        {
            if(err)
            {
                console.log('error in google strategy passport',err);
                return;
            }
            console.log(accessToken,refeshToken);
            console.log(profile);
            // if found set this user as req.user(login)
            if(user)
            {
                return done(null,user);
            }
            else
            {
                // if not found create the user and set it as req.user(signup)
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user)
                {
                    if(err)
                    {
                        console.log('error in creating user',err);
                        return;
                    }

                    return done(null,user);

                });
            }
        });
    }
));

module.exports = passport;