const nodeMailer = require('../config/nodemailer');

// this is another wya of exporting a function
exports.newComment =  (comment) => {
    console.log('inside new comment mailer', comment.user.email);

    nodeMailer.transpoter.sendMail({
        from:'chinmachat@gmail.com',
        to:comment.user.email,
        subject:"New comment publish",
        html:'<h1>yups, your comment is now publish</h1>'
    },(err,info) =>
    {
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }
        console.log('message send',info);
        return;
    });
}