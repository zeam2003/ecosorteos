const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type: String, unique: true},
    phone: String
});

const Contact = mongoose.model('contacts', contactoSchema);

module.exports = Contact;