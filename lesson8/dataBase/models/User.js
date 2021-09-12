const { Schema, model } = require('mongoose');
const { userRole } = require('../../constans');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        // select: false
    },
    role: {
      type: String,
      default: userRole.USER,
      enum: [userRole.USER, userRole.ADMIN]
    },
    avatar: {
      type: String
    },
    car: [{
        type: Schema.Types.ObjectId
    }],
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('full_name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('cars', {
    ref: 'Car',
    localField: 'Car',
    foreignField: '_id',
});

userSchema
    .pre('find', function() {
        this.populate('cars');
    })
    .pre('findOne', function() {
        this.populate('cars');
    });

module.exports = model('User', userSchema);
