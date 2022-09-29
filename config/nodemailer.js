const nodemailer = require('nodemailer');
const ejs  = require('ejs');
const path = require('path');


let transpoter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'codieal.developer@gmail.com',
        pass:'nveqzhmmtwujuwbh'
    }
});

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template)
        {
            if(err)
            {
                console.log('error in rendring template',err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transpoter: transpoter,
    renderTemplate: renderTemplate
}