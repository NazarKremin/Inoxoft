const EmailTemplates = require('email-templates');
const mailer = require('nodemailer');
const path = require('path');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config');
const ErrorHandler = require("../errors/error.messages");
const templateInfo = require('../email-templates');

const tempParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates'),
    }
});

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const currentTemplateInfo = templateInfo[action];

        if (!currentTemplateInfo) throw new ErrorHandler('Wrong mail action', 418);

        const html = await tempParser.render(currentTemplateInfo.templateName, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userMail,
            subject: currentTemplateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};