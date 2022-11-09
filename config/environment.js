const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key: 'chinmay',
    db:'codeial_development',
    dbURL: 'mongodb+srv://chinmachat:chinmay.cc@cluster0.j4ruon4.mongodb.net/?retryWrites=true&w=majority',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'codieal.developer@gmail.com',
            pass:'nveqzhmmtwujuwbh'
        }
    },
    google_client_ID:"1046015082162-fru1tgtt4liphiv44333p8sngejsppa7.apps.googleusercontent.com",
    google_client_Secret:"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",
    google_callback_URL:`http://localhost:${process.env.PORT}/users/auth/google/callback`,
    jwt_secret_key:'codeial',
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }
}

const production = {
    name:'production',
    asset_path:process.env.asset_path,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }
}

module.exports = development;