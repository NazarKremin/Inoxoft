const Joi = require('joi');

module.exports = Joi.object(
    {
        model: Joi.string()
            .alphanum()
            .min(2)
            .max(50),
        price: Joi.string()
            .alphanum()
            .min(2)
            .max(50),
    }
);