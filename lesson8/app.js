const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

const app = express();

require('dotenv').config();

const {PORT, MONGO_URL} = require('./config');
const apiRouter = require('./route/api.router');

app.use(_mainHandlerError);

_connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', apiRouter);
app.use(expressFileUpload());

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