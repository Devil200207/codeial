// setting express
const express = require('express');

// setting cookie parser
const cookieParser = require('cookie-parser');

const app = express();

// using sass middleware
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle:'expanded',
    prefix: '/css',

}));

// using port
const port = 8000;

// setting up data base
const db = require('./config/mongoose');

// using express session for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// using mongodb to store session
const MongoStore = require('connect-mongo');

// setting up static file
app.use(express.static('./assets'));

// usingcookie parser
app.use(cookieParser());

// encoding url
app.use(express.urlencoded());

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
    secret:'chinmay',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
    {
        mongoUrl:'mongodb://localhost/codeial_development',
        mongooseConnection: db,
        autoRemove:'disabled'
    },
    function(err)
    {
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err)
{  
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
});