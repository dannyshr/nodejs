const config = require('config');
const mongoose = require('mongoose');

// (async() => {
//     await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.dbname')}`);
// });

 mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.dbname')}`);

module.exports = (req, res, next) => {
    req.mongoose = mongoose;
    next();
}