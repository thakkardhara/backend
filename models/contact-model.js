const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
