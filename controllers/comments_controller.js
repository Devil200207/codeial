 const Comment = require('../models/comment');
 const Post = require('../models/post');
 
 module.exports.create = async function(req,res)
 {
    try 
    {
        let post = await Post.findById(req.body.post);

        if(post)
        {
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            
            post.comments.push(comment); 
            post.save();

            res.redirect('/');
        }        
    }
    catch (error)
    {
        console.log('Error',error);    
        return;    
    }
 }

 module.exports.destroy  = async function(req,res)
 {
    try 
    {
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id)
        {
            let postId = comment.post;
            comment.remove();

           let post =  await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

             //    for deleting likes
            await Like.deleteMany({likeabe:comment._id,onModel:'Comment'});

            req.flash('success','Comment deleted!');
            return res.redirect('back');
        }
        else
        {
            req.flash('error','Comment not found!!!');
            return res.redirect('back');
        }   
    } 
    catch (error) 
    {
        console.log('Error',error);  
        req.flash('error','Internal server error');
        return;      
    }
 }