const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        title: {
            type: String,
            min: 2,
            max: 200,
            required: true
        },
        description: {
            type: String,
            min: 2,
            max: 250,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        budget: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['pending','completed'],
            default: 'pending'
        },
        host: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true, id: true}
)

const Event = model('Event',eventSchema);

module.exports = Event;