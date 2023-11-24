const joi = require('joi')

module.exports = joi.object({
    nome: joi.string().required().messages({
        'string.empty': 'Nome não pode ser vazio',
        'any.required': 'Nome é obrigatório',
        'string.base': 'O campo nome deve ser um texto'
    }),
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