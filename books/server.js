process.env["NODE_CONFIG_DIR"] = __dirname + "/config";

const express = require('express');
const config = require('config');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(config.get('mongo.url'), { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to mongo url=['+config.get('mongo.url')+']'));

app.use('/', indexRouter);

app.listen(config.get('app.port'));
