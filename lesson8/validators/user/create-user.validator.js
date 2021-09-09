const Joi = require('joi');

const {regexpEnum} = require('../../constans');

module.exports = {
    registerUserValidator: Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(2)
            .max(50)
            .allow('X Æ A-Xii'),
        lastName: Joi.string()
            .alphanum()
            .min(2)
            .max(50)
            .allow('X Æ A-Xii'),
        email: Joi.string()
            .regex(regexpEnum.EMAIL_REGEXP)
            .required(),
        password: Joi.string()
            .regex(regexpEnum.PASSWORD_REGEXP)
            .required()
    }),

    userLoginValidator: Joi.object({
        email: Joi
            .string()
            .trim()
            .regex(regexpEnum.EMAIL_REGEXP)
            .required(),
        password: Joi
            .string()
            .trim()
            .min(8)
            .max(30)
            .regex(regexpEnum.PASSWORD_REGEXP)
            .required(),
    }),

    updateUserValidator: Joi.object({
        email: Joi
            .string()
            .trim()
            .regex(regexpEnum.EMAIL_REGEXP),
        password: Joi
            .string()
            .trim()
            .min(8)
            .max(30)
            .regex(regexpEnum.PASSWORD_REGEXP),
        userId: Joi
            .string()
            .trim()
            .min(24)
            .max(24)
            .required()
    }),

    userByIdValidator: Joi.object({
        userId: Joi
            .string()
            .trim()
            .min(24)
            .max(24)
            .required()
    }),

    passwordValidator: Joi.object({
        password: Joi.string()
            .regex(regexpEnum.PASSWORD_REGEXP)
            .required()
            .trim()
    }),
};