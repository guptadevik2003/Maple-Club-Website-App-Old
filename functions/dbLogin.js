const mongoose = require('mongoose')

module.exports = ({ app, express }) => {

    express.dbLogin = async () => {
        
        mongoose.Promise = global.Promise
        mongoose.connect(process.env.MAPLECLUB_MONGODB)

        mongoose.connection.on('connected', async () => {
            console.log(`Connected to MapleClub Database.`)
        })

        mongoose.connection.on('disconnected', async () => {
            console.log(`Disconnected from MapleClub Database.`)
        })

        mongoose.connection.on('err', async (error) => {
            console.log(error)
        })

    }

}
