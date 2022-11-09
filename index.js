// setting express
const express = require('express');

// setting cookie parser
const cookieParser = require('cookie-parser');

// calling morgan
const logger = require('morgan');

// using app
const app = express();

// calling view-helper
require('./config/view-helper')(app);

// using port
const port = 8000;

// setting up data base
const db = require('./config/mongoose');

// using express session for session cookie
const session = require('express-session');

// using all strategy
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');

// using mongodb to store session
const MongoStore = require('connect-mongo');

// using sass middleware
const sassMiddleware = require('node-sass-middleware');

// using connect flash to show flash messages
const flash = require('connect-flash');

// calling the middle ware we made to show flash messages
const custoMware = require('./config/middleware');
const env = require('./config/environment');
// setting up chatting server and socket.io for chatting
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);

console.log('chat server is listing on port 5000');

const path = require('path');
// const env = require('./config/environment');

app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: true,
    outputStyle:'expanded',
    prefix: '/css',
}));    

// setting up static file
app.use(express.static(env.asset_path));

// usingcookie parser
app.use(cookieParser());

// encoding url
app.use(express.urlencoded());

// using upload to get avatars and pics and alos making it avilable for browser
app.use('/uploads',express.static(__dirname + '/uploads'));

// using logger
app.use(logger(env.morgan.mode,env.morgan.options))

// using express-ejs-layouts library
const expressLayouts = require('express-ejs-layouts');

// telling app that site which are called are layouts types
app.use(expressLayouts);

// extract style and script from sub pages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set ejs as view engine
app.set('view engine','ejs');
// set views folder for view
app.set('views','./views');

// mongostore is use to store session cookie in the db
app.use(session({
    name:'codeial',
    // todo change the secret before deployment in production moad
    secret:env.session_cookie_key,
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
    {
        mongoUrl:env.dbURL,
        mongooseConnection: db,
        autoRemove:'disabled'
    },
    function(err)
    {
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
// using session middleware
app.use(passport.session());
// using passposrt middleware to authenticate
app.use(passport.setAuthenticatedUser);
// using flash middleware its called after session cooki because it uses session cookies
app.use(flash());
app.use(custoMware.setFlash);
// use express router
app.use('/',require('./routes'));

// to check that server is running
app.listen(port,function(err)
{  
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
});