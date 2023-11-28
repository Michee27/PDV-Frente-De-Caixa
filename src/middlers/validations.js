const knex = require('../config/connection')
const queryUser = require('../data/queryUser')

const checkEmail = async (req, res, next) => {
    const { email } = req.body

    try {
        const emailsDB = await knex.select('email').from('usuarios')

        const validateEmail = emailsDB.some(user => user.email == email)
        if (validateEmail) {
            return res.status(400).json({
                message: "Já existe uma conta com o email informado"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

    next()
}

const checkEmailtoUpdate = async (req, res, next) => {
    const { email } = req.body

    try {
        const id = req.userID;  
        const userEmail = await queryUser.get_user_by_email(email, id);
        const emailsDB = await knex.select('email').from('usuarios');
        const validateEmail = emailsDB.some(user => user.email === userEmail?.email);

        if (userEmail === email && !validateEmail || userEmail === undefined) {
            return next()
        }
        if (validateEmail && userEmail.id !== id) {
            return res.status(400).json({
                message: "Já existe uma conta com o email informado"
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

const validateBody = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        return next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    checkEmail,
    validateBody,
    checkEmailtoUpdate
}