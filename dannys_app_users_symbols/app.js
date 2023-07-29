process.env["NODE_CONFIG_DIR"] = __dirname + "/config";

const express = require('express');
const config = require('config');
const path = require('path');

const port = config.get('app.port');
const host = 'localhost';
const appName = config.get('app.name');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error');
const guestsRouter = require('./routes/guestsRouter');
const usersRouter = require('./routes/usersRouter');
const githubRouter = require('./routes/githubRouter');
const apiRouter = require('./routes/ap');
const mysql = require('./middlewares/mysql');
const mongo = require('./middlewares/mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(mysql);
app.use(mongo);

const MySQLStore = require('express-mysql-session')(session);
const mysqlOptions = {
    host: config.get('mysql.host'),
    port: config.get('mysql.port'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
};
const sessionStore = new MySQLStore(mysqlOptions);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
    store: sessionStore,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
}));

app.use(auth.initialize());
app.use(auth.session());

app.use('/',guestsRouter);
app.use('/',usersRouter);
app.use('/github',githubRouter);

app.use(errorHandler);
app.use(notFound);

io.on('connection', (socket) => {
    console.log('a user has connected to the server');
    socket.on('workerUpdate', (msg) => {
        console.log('received event [workerUpdate], with msg=['+JSON.stringify(msg)+']');
        io.emit('symbolValueUpdated', msg);
    });
    socket.on('disconnect', (msg) => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`${host} ${appName} is listening on port ${port} with appConfig=[${JSON.stringify(config.get('app'))}] and mysqlConfig=[${JSON.stringify(config.get('mysql'))}]`);
});
