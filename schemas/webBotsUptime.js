const mongoose = require('mongoose')

const webBotsUptime = new mongoose.Schema({

    botUserId: {
        type: String,
        required: true,
        unique: true
    },
    lastPingedTimestamp: {
        type: Number
    },
    lastOfflineTimestamp: {
        type: Number
    },
    botOwnerId: {
        type: String,
        required: true
    },
    botNotifyServerId: {
        type: String
    },
    botNotifyChannelId: {
        type: String
    },
    botNotifyEmailId: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('webBotsUptime', webBotsUptime, 'webBotsUptime')
