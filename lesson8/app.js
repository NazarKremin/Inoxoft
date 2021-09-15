const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

const {PORT, MONGO_URL, ALLOWED_ORIGIN} = require('./config');
const apiRouter = require('./route/api.router');
const ErrorHandler = require("./errors/error.messages");
const {statusCodes, errorMessages} = require("./constans");

app.use(_mainHandlerError);

_connectDB();

app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', apiRouter);
app.use(expressFileUpload());
app.use(helmet());

if (process.env.ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.listen(PORT, () => {
    console.log('Server work');
});

function _connectDB() {
    mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const {connection} = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}

function _mainHandlerError(err, req, res, next) {
    const {message = 'Unknow error', status = 500} = err;

    return res
        .status(status)
        .json({
            message
        });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(
            statusCodes.FORBIDDEN, errorMessages.CORS_ORIGIN_NOT_ALLOWED.en
        ), false);
    }

    return callback(null, true);
}