// using passport
const passport = require('passport');

// using local strategy
const LocalStrategy = require('passport-local').Strategy;

// import user
const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done) // finf a user and establishing the identity
    {
      User.findOne({email:email},function(err,user)
      {
        if(err) //error if any
        {
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password != password) // user not found or password not match but user is found
        {
            req.flash('error','Invalid username /password');
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

// check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is sign in then pass on the req to next function(controler's action)
    if(req.isAuthenticated())
    {
        return next();
    }

    // is user is not sign in
    return res.redirect('/users/signin');

};

passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        // console.log(req.user);
        // req.user contains the current signed in user from the session cookies and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;