require("dotenv").config();
const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var apiRouter = require("./src/routes/api.routes");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
global.__basedir = __dirname;
app.use(express.json({ limit: '80mb' }));
app.use(express.urlencoded({ limit: '80mb', extended: true }));

app.use(cookieParser());

app.use(cors());

app.use(helmet());

app.use(helmet.frameguard({ action: 'deny' }));

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after a minute',
    statusCode: 429
});

app.use(limiter);

app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}));

const allowedHosts = ['localhost:8080', '127.0.0.1:8080', '192.168.1.10:8080'];

const checkHostHeader = (req, res, next) => {
    const hostHeader = req.get('Host');
    if (allowedHosts.includes(hostHeader)) {
        next();
    } else {
        res.status(400).send('Invalid Host header');
    }
};

app.use(checkHostHeader);

app.use(express.urlencoded({ extended: true }));

var allowedOrigins = [
    '*'
];

app.use(function (req, res, next) {
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    } else if (allowedOrigins.indexOf('*') > -1) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    } else {
        res.status(400).send('Invalid Host header');
    }

});
app.use("/api/", apiRouter);

app.disable('x-powered-by');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});




