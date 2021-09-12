module.exports = {
    HERE_NOTHING: {
        en: 'Here nothing..',
        ua: 'Тут нічого немає'
    },
    WRONG_NAME: {
        en: 'Your name is wrong,please try again.',
        ua: 'Не правильне імя, спробуй щераз'
    },
    WRONG_ID: {
        en: 'This id is wrong<pls try again.',
        ua: 'Це неправильне айді, попробуй ще раз'
    },
    EMAIL_IS_WRONG: {
        en: 'This mail wrong, try again',
        ua: 'Цей мейл невірний, попробуй ще раз.'
    },
    NOT_VALID_MODEL: {
        en: 'This not valid model',
        ua: 'Чоловіче ти щось переплутав'
    },
    NOT_VALID_PRICE: {
        en: 'Wrong price',
        ua: 'А ти не перебільшуєш?'
    },
    EMAIL_ALLREADY_USE: {
        en: 'Email already use',
        ua: 'Цей мейл вже використовується'
    },
    USER_NOT_VALID: {
        en: 'User not valid',
        ua: 'Непрвильний ммейл або пасс'
    },
    TOKEN_NOT_VALID: {
        en: 'Not valid token',
        ua: 'Не валідний токен',
    },
    TOKEN_REQUIRED: {
        en: 'No token',
        ua: 'Немає токена',
    },
    INVALID_TOKEN: {
        en: 'Invalid token'
    },
    WRONG_EMAIL_ACTION: {
        en: 'Wrong email action'
    },
    USER_NOT_FOUND: {
        en: 'User not found'
    },
    WRONG_TOKEN_TYPE: {
        en: 'Wrong token type'
    },
    FILE_IS_TOO_BIG: (name) => {
       return {en: `File ${name} is too big`}
    },
    WRONG_FILE_FORMAT: (name) => {
        return {en: `Wrong file format ${name}`}
    }
};
