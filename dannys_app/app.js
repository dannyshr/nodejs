const express = require('express');
const config = require('config');
const path = require('path');

const app = express();
const port = config.get('app.port');
const host = 'localhost';
const appName = config.get('app.name');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error');
const guestsRouter = require('./routes/guestsRouter');
const usersRouter = require('./routes/usersRouter');
const githubRouter = require('./routes/githubRouter');
const mysql = require('./middlewares/mysql');
const mongo = require('/middleware/mongo');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(mysql);
app.use(mongo);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/',guestsRouter);
app.use('/',usersRouter);
app.use('/github',githubRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(port, host, () => {
    console.log(`${host} ${appName} is listening on port ${port} with appConfig=[${JSON.stringify(config.get('app'))}] and mysqlConfig=[${JSON.stringify(config.get('mysql'))}]`);
});
