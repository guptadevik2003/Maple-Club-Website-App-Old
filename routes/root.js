const express = require('express')
const { isAuth, isNotAuth, isDev, devFetcher } = require('../otherFunctions/authValidator')

const router = express.Router()

router.get('/arc-sw.js', async (req, res) => {
    res.sendFile(`${process.cwd()}/views/arc-sw.js`)
})

router.get('/', async (req, res) => {
    res.render('home.ejs')
})
router.get('/home', async (req, res) => {
    res.redirect('/')
})
router.get('/index', async (req, res) => {
    res.redirect('/')
})

router.get('/login', isNotAuth, async (req, res) => {
    res.redirect('/api/user/login')
})

router.get('/dashboard', isAuth, async (req, res) => {
    res.render('dashboard.ejs')
})

module.exports = router
