const Post = require('../../../models/post');
const comment = require('../../../models/comment');

module.exports.index = async function(req,res)
{
    let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    return res.json(200,{
        message:"List of posts",
        posts:posts
    });
}

module.exports.destroy = async function(req,res)
{
  try 
  {
    let post = await Post.findById(req.params.id);
    
    // .id means converting object id into string 
    // if(post.user == req.user.id)
    // {
        post.remove();
        req.flash('success','post deleted successfully')
        await comment.deleteMany({post:req.params.id});
        return res.json(200,{
            message:"post deleted" 
        })
    // }
    // else
    // {
    //   req.flash('error','error in deleting post');
    //   return res.redirect('back');
    // }
  }
  catch (error)
  {
    console.log('**********************',error);
    return res.json(500,{
        message:"Internal server error"
    });
  }
}