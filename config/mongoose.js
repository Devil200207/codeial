const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('err',console.error.bind(console,"error on connectiong to database"));

db.once('open',function()
{
    console.log('connected to database :: Mongodb');
});

module.exports = db;