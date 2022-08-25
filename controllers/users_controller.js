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

  // get the sign up data

  module.exports.create = function(req,res)
  {
    // todo later
  }

  module.exports.createSession = function(req,res)
  {
    // todo later
  }
