const jwt = require('../config/jwt')

module.exports = function (req, res, next) {
    const bearer = req.headers.authorization

    if (!bearer) {
        return res.status(400).send({ message: 'Token não foi passado.' })
    }

    const token = bearer.split(' ')[1];
    const user = jwt.getUser(token);

    if (!user) {
        return res.status(401).send({ message: 'Usuário não autorizado ou expirou o token' });
    }

    req.userID = user.id;

    next()
}