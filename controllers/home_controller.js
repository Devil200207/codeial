const Post = require('../models/post');

module.exports.home = function(req,res)
{      
    // populate user of each post
    Post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(function(err,posts)
    {
        return res.render('home',{
            title: "Codeial home",
            posts:posts 
        });
    })
} 