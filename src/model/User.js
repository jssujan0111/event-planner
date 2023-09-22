const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            min: 6,
            max: 32,
            required: true
        }
    },
    { timestamps: true, id: true}
)

const User = model('User',userSchema);

module.exports = User;