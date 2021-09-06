const { emailAction } = require('../constans');

module.exports = {
    [emailAction.WELCOME]: {
        templateName: 'welcome',
        subject: 'Вітаю в команді'
    },
    [emailAction.USER_BLOCKED]: {
        templateName: 'user-blocked',
        subject: 'Твій аккаунт заблокований'
    },
    [emailAction.PASSWORD_CHANGE]: {
        templateName: 'null',
        subject: 'Пароль зміненний'
    }
};