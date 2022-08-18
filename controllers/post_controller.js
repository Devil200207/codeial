module.exports.post = function(req,res)
{
   return res.render('post',{
      title :"Posts"
   });
   // res.end('<h1>post of users</h1>');
}