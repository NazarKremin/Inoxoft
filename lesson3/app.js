const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const app = express();

const { apiRouter } = require('./route');
const { PORT } = require('./config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`Server work on ${PORT} port`);
});
