// using express
const express = require('express');
const app = express();

// using port
const port = 8000;

// setting up data base
const db = require('./config/mongoose');

// setting up static file
app.use(express.static('./assets'));

// using express-ejs-layouts library
const expressLayouts = require('express-ejs-layouts');

// telling app that site which are called are layouts types
app.use(expressLayouts);

// extract style and script from sub pages to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes'));

// set ejs as view engine
app.set('view engine','ejs');

// set views folder for view
app.set('views','./views');


app.listen(port,function(err)
{  
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
});