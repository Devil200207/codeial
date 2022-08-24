  module.exports.profile = function(req,res)
  {
    return res.render('users_profile',{
      title: "profile"
    });
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