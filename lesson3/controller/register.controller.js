const { registerService } = require('../service');

module.exports = {
    renderRegisterPage: ( req, res ) => res.render('register'),

    registerUser: async ( req, res ) => {
        try {
            const { email, password } = req.body;

            await registerService.registerUser({
                email,
                password
            });

            res.status(201).redirect('/login');
        } catch ( e ) {
            res.status(400).json('Not valid email or pass');
        }
    }
};
