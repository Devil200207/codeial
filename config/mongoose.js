const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(env.dbURL);

const db = mongoose.connection;

db.on('err',console.error.bind(console,"error on connectiong to database"));

db.once('open',function()
{
    
    console.log('connected to database :: Mongodb');
});

module.exports = db;