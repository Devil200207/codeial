const User = require('../models/user');    

  module.exports.profile = function(req,res)
  {
    User.findById(req.params.id,function(err,user)
    {
      console.log(user);
      return res.render('users_profile',{
        title: "profile",
        profile_user:user
      });
    })
  }

  module.exports.update = function(req,res)
  {
    console.log(req.params.id);
    if(req.user.id == req.params.id)
    {
      User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
      {
        return res.redirect('back');
      });
    }
    else
    {
      return res.status(401).send('Unauthorized');
    }
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
    req.flash('success','Logged In successfully');
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
      req.flash('success','Logged Out successfully');
      return res.redirect('/');
    });
    
    
  }
