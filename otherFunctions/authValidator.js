const fetch = require('node-fetch')

module.exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports.isNotAuth = (req, res, next) => {
    if (req.session.isAuth) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

module.exports.isDev = (req, res, next) => {
    if (req.session.isDev) {
        next()
    } else {
        res.redirect('/dashboard')
    }
}



module.exports.devFetcher = async (access_token) => {
    let result
    const apiURL = `https://discord.com/api/users/@me`
    await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        result = data
    })
    return result
}
