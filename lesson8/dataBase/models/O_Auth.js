const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

oAuthSchema
    .pre('findOne', function() {
        this.populate('_user_id');
    })
    .pre('findOne', function() {
        this.populate('User');
    });

module.exports = model('O_Auth', oAuthSchema);