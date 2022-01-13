const mongoose = require('mongoose')

const webUsersProfile = new mongoose.Schema({

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
    email: {
        type: String
    },
    accountCreated: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('webUsersProfile', webUsersProfile, 'webUsersProfile')
