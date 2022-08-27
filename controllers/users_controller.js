const User = require('../models/user');  
  
  module.exports.profile = function(req,res)
  {
    return res.render('users_profile',{
      title: "profile"
    });
  }

  // render the sign-in and sign-up page
  module.exports.signin = function(req,res)
  {
    if(req.isAuthenticated())
    {
      return res.redirect('/users/profile');
    }
    return res.render('signin',{
      title:"Codeial | Sign In"
    });
  }

  module.exports.signup = function(req,res)
  {
    if(req.isAuthenticated())
    {
      return res.redirect('/users/profile');
    }
    return res.render('signup',{
      title:"Codeial | Sign Up"
    });
  }

  // get the sign up data

  module.exports.create = function(req,res)
  {
    if(req.body.password != req.body.confirm_password)
    {
      return res.redirect('back');
    }
    
    User.findOne({email: req.body.email},function(err,user)
    {
      if(err)
      {
        console.log('error in finding user in signingup');
        return;
      }

      if(!user)
      {
        User.create(req.body,function(err,user)
        {
          if(err)
          {
            console.log('error in finding user in signingup');
            return;
          }

          return res.redirect('/users/signin');
        })
      }
      else
      {
        return res.redirect('back');
      }
    });
     
  }
  
  // sign in and create a session for the user
  module.exports.createSession = function(req,res)
  {
    return res.redirect('/');
  }

  module.exports.destroySession = function(req,res,next)
  {
    req.logout(function(err)
    {
      if(err)
      {
        next(err);
      }
    });
    return res.redirect('/');
  }
