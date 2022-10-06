 const Comment = require('../models/comment');
 const Post = require('../models/post');
 const commentMailer = require('../mailers/comments_mailer');
const { populate } = require('../models/comment');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const { Job } = require('kue');
 
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

            comment = await comment.populate('user');
            // commentMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err)
            {
                if(err)
                {
                    console.log('error in creating a queue');
                    return;
                }

                console.log('job enquied',job.id);

            });

            req.flash('success','Comment Publish');
           return res.redirect('/');
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
            return res.redirect('back');
        }
        else
        {
            return res.redirect('back');
        }   
    } 
    catch (error) 
    {
        console.log('Error',error);  
        return;      
    }
 }