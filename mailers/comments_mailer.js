const nodeMailer = require('../config/nodemailer');

// this is another wya of exporting a function
exports.newComment =  (comment) => {
    
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transpoter.sendMail({
        from:'codieal.developer@gmail.com',
        to:comment.user.email,
        subject:"New comment publish",
        html:htmlString
    },(err,info) =>
    {
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }
        return;
    });
}