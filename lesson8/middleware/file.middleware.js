const ErrorHandler = require("../errors/error.messages");
const { constans: { MAX_SIZE_AVATAR, PHOTOS_MIMETYPES }, statusCodes, errorMessages} = require('../constans');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (size > MAX_SIZE_AVATAR) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.FILE_IS_TOO_BIG(name).en));

            if (!PHOTOS_MIMETYPES.includes(mimetype)) next(new ErrorHandler(statusCodes.BAD_REQUEST, errorMessages.WRONG_FILE_FORMAT(name).en));

            next();
        } catch (e) {
            next(e);
        }
    }
};