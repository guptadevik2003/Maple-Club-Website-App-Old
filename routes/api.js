const express = require('express')
const webBotsUptime = require('../schemas/webBotsUptime')
const JAT = require('../otherFunctions/JwtApiToken')

const router = express.Router()

router.get('/', async (req, res) => {
    res.json({ msg: 'working' })
})

router.post('/bot/:botIdParam', JAT.authToken, async (req, res) => {
    console.log(`Hello world`)
    let botIdParam = req.params.botIdParam
    res.json({ botId: botIdParam })
})

router.post('/create/:id', async (req, res) => {
    const token = await JAT.create(req.params.id)
    res.json({ token: token })
})

module.exports = router
