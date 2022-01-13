const jwt = require('jsonwebtoken')

module.exports.create = async (discordId) => {

    const user = {
        discordId: discordId
    }

    const token = jwt.sign(user, process.env.JWT_API_TOKEN_SECRET)
    
    return token

}

module.exports.authToken = async (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.json({ msg: 'wrong_token'}).status(401)
    
    jwt.verify(token, process.env.JWT_API_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({ msg: 'denied' }).status(403)
        req.user = user
        next()
    })

}