// using passport
const passport = require('passport');

// using local strategy
const LocalStrategy = require('passport-local').Strategy;

// import user
const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done) // finf a user and establishing the identity
    {
      User.findOne({email:email},function(err,user)
      {
        if(err) //error if any
        {
            console.log('error in finfing user');
            return done(err);
        }
        if(!user || user.password != password) // user not found or password not match but user is found
        {
            console.log('Invalid username /password');
            return done(null,false);
        }
        else // user found
        {
            return done(null,user);
        }
      })
    }

));


//  serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});

// deseralizing the user from the key in the cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(error,user)
    {
        if(error)
        {
            console.log('error in finding user');
            return done(err,false);
        }

        return done(null,user);
    })
});

module.exports = passport;