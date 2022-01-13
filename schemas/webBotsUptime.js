const mongoose = require('mongoose')

const webBotsUptime = new mongoose.Schema({

    botUserId: {
        type: String,
        required: true,
        unique: true
    },
    lastPingedTimestamp: {
        type: Number,
    },
    botOwnerId: {
        type: String,
        required: true
    },
    botOwnerEmail: {
        type: String
    },
    botSupportServerId: {
        type: String,
        required: true
    },
    lastOfflineTimestamp: {
        type: Number
    }

})

module.exports = mongoose.model('webBotsUptime', webBotsUptime, 'webBotsUptime')
