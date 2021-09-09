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
    },
    [emailAction.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Забув пароль?'
    },
    [emailAction.ADMIN_CREATED]: {
        templateName: 'admin',
        subject: 'Адмін створив вам аккаунт'
    }
};