const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res)
{   
    try 
    {
        // populate user of each post
        let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
            path:'comments',
            populate:{
                path:'user'
            },
            populate:{
                path:'likes'
            }
        }).populate('likes');

        let users = await User.find({});

        return res.render('home',{
            title: "Codeial home",
            posts:posts,
            all_users:users
        });    
        
    } 
    catch (error) 
    {
        console.log('Error',error);
        return;     
    }
} 