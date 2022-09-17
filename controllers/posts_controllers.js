const Post = require('../models/post');
const comment  = require('../models/comment');

module.exports.create = async function(req,res)
{
   try 
   {
      let posts = await Post.create({
          content: req.body.content,
          user: req.user._id
      });

      req.flash('success','Post created succesfully');
      return res.redirect('/');
   } 
   catch (error)
   {
      req.flash('error','error in creation post')
      return; 
   }
}

module.exports.destroy = async function(req,res)
{
  try 
  {
    let post = await Post.findById(req.params.id);
    
    // .id means converting object id into string 
    if(post.user == req.user.id)
    {
        post.remove();
        req.flash('success','post deleted successfully')
        await comment.deleteMany({post:req.params.id});
        return res.redirect('back');
    }
    else
    {
      req.flash('error','error in deleting post');
      return res.redirect('back');
    }
  }
  catch (error)
  {
    console.log('Error',error);
    return;
  }
}