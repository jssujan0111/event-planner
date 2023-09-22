const { Schema, model } = require('mongoose');

const guestSchema = new Schema(
    {
        name: {
            type: String,
            min: 2,
            max: 32,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        invitationStatus: {
            type: String,
            enum: ['sent','not_sent'],
            default: 'not_sent'
        },
        RSVPs: {
            type: String,
            enum: ['attending','not_attending','undecided'],
            default: 'undecided'
        },
        event: {
            type: Schema.ObjectId,
            ref: 'Event'
        }
    },
    { timestamps: true, id: true}
)

const Guest = model('Guest',guestSchema)

module.exports = Guest