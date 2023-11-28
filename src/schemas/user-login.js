const joi = require('joi')

module.exports = joi.object({
    email: joi.string().email().required().messages({
        'string.empty': 'Email não pode ser vazio',
        'string.email': 'Email inválido',
        'string.base': 'O campo email deve ser um texto',
        'any.required': 'Email é obrigatório'
    }),

    senha: joi.string().min(5).required().messages({
        'string.empty': 'Senha não pode ser vazia',
        'any.required': 'Senha é obrigatória',
        'string.min': 'A senha deve ter pelo menos 5 caracteres'
    })
})