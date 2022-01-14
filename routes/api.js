const express = require('express')
const websiteUsers = require('../schemas/websiteUsers')
const webBotsUptime = require('../schemas/webBotsUptime')
const { createToken, isAuthToken } = require('../otherFunctions/JwtApiToken')
const { isAuth, isNotAuth, isDev, devFetcher } = require('../otherFunctions/authValidator')

const router = express.Router()

// User
router.get('/user/login', isNotAuth, async (req, res) => {
    const scopes = 'identify email guilds'
    const client_id = `855017456284467210`
    let redirectURI
    if (process.env.BUILD_MODE === 'development') {
        redirectURI = `http://localhost:${process.env.PORT}/api/discord-redirect` }
    if (process.env.BUILD_MODE === 'production') {
        redirectURI = 'https://mapleclub.top/api/discord-redirect' }
    let authURL = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirectURI}&state=MapleClubTopWebsite&scope=${scopes}&show_dialog=false`
    res.redirect(authURL)
})

router.post('/user/logout', isAuth, async (req, res) => {
    req.session.destroy()
    return res.redirect('/')
})

router.post('/user/', isAuth, async (req, res) => {
    
})

// Discord Login Redirect
router.get('/discord-redirect', isNotAuth, async (req, res) => {
    if (!req.url.includes('access_token')) return res.render('api-discord-redirect.ejs')
    const { token_type, access_token, expires_in, scope, state } = req.query
    if (!access_token) return res.redirect('/login')
    const userInfo = await devFetcher(access_token)
    if (!userInfo.id) return res.redirect('/login')
    req.session.isAuth = true
    req.session.access_token = access_token
    const developers = ['741522321344430171']
    if (developers.includes(userInfo.id)) {
        req.session.isDev = true
    }
    return res.redirect('/dashboard')
})

router.get('/', async (req, res) => {
    res.json({ msg: 'working' })
})

router.post('/bot/:botIdParam', isAuthToken, async (req, res) => {
    // Getting botId from botIdParam
    const botIdParam = req.params.botIdParam
    if (!botIdParam) return res.status(400).json({ success: false, error: 'botId Not Provided' })

    // Checking for botId in database
    let botData = await webBotsUptime.findOne({ botUserId: botIdParam })
    if (!botData) return res.status(400).json({ success: false, error: 'botId is Wrong / Not Registered' })
    
    let pingTimestamp = new Date().getTime()

    await webBotsUptime.findOneAndUpdate({ botUserId: botIdParam }, {
        lastPingedTimestamp: pingTimestamp
    })

    res.json({
        success: true,
        message: {
            botUserId: botData.botUserId,
            lastPingedTimestamp: pingTimestamp,
            lastOfflineTimestamp: botData.lastOfflineTimestamp,
            botOwnerId: botData.botOwnerId,
            botNotifyServerId: botData.botNotifyServerId,
            botNotifyChannelId: botData.botNotifyChannelId,
            botNotifyEmailId: botData.botNotifyEmailId
        }
    })
})

router.post('/create/:id', async (req, res) => {
    const token = await createToken(req.params.id)
    res.json({ token: token })
})

module.exports = router
