const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    res.json({ msg: 'working' })
})

router.post('/bot/:botIdParam', async (req, res) => {
    let botIdParam = req.params.botIdParam
    res.json({ botId: botIdParam })
})

module.exports = router