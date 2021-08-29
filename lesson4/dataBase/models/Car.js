const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    model: {
        type: String,
        trim: true
    },
    price: {
        type: String,
        trim: true
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('Car', carSchema);
