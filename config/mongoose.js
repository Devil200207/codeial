const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('err',console.error.bind(console,"error on connectiong to database"));

db.once('open',function()
{
    console.log('connected to database :: Mongodb');
});

module.exports = db;