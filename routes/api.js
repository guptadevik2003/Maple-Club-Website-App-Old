const express = require('express')
const webBotsUptime = require('../schemas/webBotsUptime')
const JAT = require('../otherFunctions/JwtApiToken')
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
