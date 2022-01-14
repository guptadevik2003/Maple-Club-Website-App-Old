const mongoose = require('mongoose')

const websiteUsers = new mongoose.Schema({

    discordId: {
        type: String,
        required: true,
        unique: true
    },
    apiToken: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
    },
    emailIdVerified: {
        type: Boolean,
        default: false
    },
    accountCreatedTimestamp: {
        type: Number,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('websiteUsers', websiteUsers, 'websiteUsers')
