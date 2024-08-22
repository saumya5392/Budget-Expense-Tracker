const mongoose = require('mongoose');


const usrsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
       // required: true,
    },
    phoneno: {
        type: String,
       // required: true,
    },
    work: {
        type: String,
       // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}, { timestamps: false })

module.exports = mongoose.model('Users', usrsSchema)