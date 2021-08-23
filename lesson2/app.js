const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const app = express();

const { PORT } = require('./constans');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/register', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {

        if (err) {
            console.log(err);
        }

        const userData = JSON.parse(data.toString());

        const userFind = userData.find(user => user.email === req.body.email);

        if (!userFind) {
            userData.push(req.body)
            fs.writeFile(path.join(__dirname, 'users.txt'), JSON.stringify(userData), err1 => {

                if (err1) {
                    console.log(err1);
                }
            });
            res.redirect('/users');
        }

        res.redirect('/error');
    });
});

app.get('/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {

        if (err) {
            console.log(err);
        }
        const allUsersData = JSON.parse(data.toString());

        res.render('users', {users: allUsersData});
    });
});

app.post('/login', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {

        if (err) {
            console.log(err);
        }

        const loginUserData = JSON.parse(data.toString());

        const {email, password} = req.body;

        const logIn = loginUserData.findIndex(value => value.email === email && value.password === password);

        if (logIn === -1) {
            res.redirect('/register');

        } else {
            res.redirect(`/users/${logIn}`)
        }
    });
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {

        if (err) {
            console.log(err);
            return;
        }
        const userDataId = JSON.parse(data.toString());

        res.json(userDataId[userId]);
    });
});

app.listen(PORT, () => {
    console.log(`Server work at the ${PORT} port`)
});