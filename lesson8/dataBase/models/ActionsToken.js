const { Schema, model } = require('mongoose');

const actionTokenSchema = new Schema({
    forgot_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

actionTokenSchema
    .pre('findOne', function() {
        this.populate('_user_id');
    });

module.exports = model('ActionToken', actionTokenSchema);