const jwt = require('jsonwebtoken')

const config = {
    password: process.env.JWT_PASS || '123456',
    option: {
        expiresIn: '8h',
    }
}

module.exports = {
    config,
    createToken(data) {
        return jwt.sign(data, config.password, config.option);
    },

    getUser(token) {
        try {
            return jwt.verify(token, config.password)
        } catch (error) {
            return
        }
    }
}