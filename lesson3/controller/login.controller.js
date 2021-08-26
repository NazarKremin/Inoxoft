const { loginService } = require('../service');

module.exports = {
    renderLoginPage: ( req, res ) => res.render('login'),

    authUser: async ( req, res ) => {
        try {
            const { email, password } = req.body;

            const user = await loginService.getUser(email);

            ( !user || user.password !== password ) ?
                res.redirect('/error') :
                res.redirect('/user');
        } catch ( e ) {
            res.status(400).redirect('/error');
        }
    }
};
