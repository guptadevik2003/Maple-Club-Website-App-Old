const express = require('express')

const router = express.Router()

router.get('/arc-sw.js', async (req, res) => {
    res.sendFile(`${process.cwd()}/views/arc-sw.js`)
})

router.get('/favicon.ico', async (req, res) => {
    res.sendFile(`${process.cwd()}/views/assets/favicon.ico`)
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

router.get('/login', async (req, res) => {
    res.redirect('/api/user/login')
})

module.exports = router
