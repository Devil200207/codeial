const User = require('../models/user');  
  
  module.exports.profile = function(req,res)
  {
    if(req.cookies.user_id)
    {
      User.findById(req.cookies.user_id,function(err,user)
      {
        if(err)
        {
          console.log('error');
          return;
        }

        if(user)
        {
          return res.render('users_profile',{
            title:"User profile",
            user:user
          });
        }
      });
    }
    else
    {
      return res.redirect('/users/signin')
    }
  }

  // render the sign-in and sign-up page
  module.exports.signin = function(req,res)
  {
    return res.render('signin',{
      title:"Codeial | Sign In"
    });
  }

  module.exports.signup = function(req,res)
  {
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
        console.log('error in finding user in signing up');
        return;
      }

      if(!user)
      {
        User.create(req.body,function(err,user)
        {
          if(err)
          {
            console.log('error in finding user in signing up');
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

  module.exports.createSession = function(req,res)
  {
    // step to authentication
    //find the user
    User.findOne({email: req.body.email} ,function(err,user)
    {
      if(err)
      {
        console.log('error in finding user in signing in');
        return;
      }

      if(user)  // if user found
      {
        if(user.password != req.body.password) // if user found handle & password not match
        {
          return res.redirect('back');
        }       
        
        // session created
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');
      }
      else  // handle if user not found
      {
        return res.redirect('back');
      }
    })    
  }

  module.exports.destroySession = function(req,res)
 {
   return res.redirect('/users/signin');
 }