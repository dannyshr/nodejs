const config = require('config');
const mongoose = require('mongoose');

await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.dbname')}`);

module.exports = (req, res, next) => {
    req.mongoose = mongoose;
    next();
}