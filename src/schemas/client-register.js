const joi = require('joi');

module.exports = joi.object({
    nome: joi.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.base": "O campo nome deve ser do tipo string",
        "string.empty": "O campo nome é obrigatório",
    }),

    email: joi.string().email().required().messages({
        "string.email": "O campo email precisa ser em um formato válido",
        "any.required": "O campo email é obrigatório",
        "string.empty": "O campo email é obrigatório",
    }),

    cpf: joi.string().length(11).required().messages({
        "any.required": "O campo cpf é obrigatório",
        "string.base": "O campo cpf deve ser do tipo numérico.",
        "string.length": "O cpf precisa conter 11 caracteres",
    }),

    cep: joi.string().length(8).required().messages({
        "any.required": "O campo cep é obrigatório",
        "string.base": "O campo cep deve ser do tipo string",
        "string.empty": "O campo cep é obrigatório",
        "string.length": "O campo cep deve conter exatamente 8 caracteres",
    }),

    rua: joi.string().required().messages({
        "any.required": "O campo rua é obrigatório",
        "string.base": "O campo rua deve ser do tipo string",
        "string.empty": "O campo rua é obrigatório",
    }),

    numero: joi.string().required().messages({
        "any.required": "O campo numero é obrigatório",
        "string.base": "O campo numero deve ser do tipo string",
        "string.empty": "O campo numero é obrigatório",
    }),

    bairro: joi.string().required().messages({
        "any.required": "O campo bairro é obrigatório",
        "string.base": "O campo bairro deve ser do tipo string",
        "string.empty": "O campo bairro é obrigatório",
    }),

    cidade: joi.string().required().messages({
        "any.required": "O campo cidade é obrigatório",
        "string.base": "O campo cidade deve ser do tipo string",
        "string.empty": "O campo cidade é obrigatório",
    }),

    estado: joi.string().length(2).required().messages({
        "any.required": "O campo estado é obrigatório",
        "string.base": "O campo estado deve ser do tipo string",
        "string.empty": "O campo estado é obrigatório",
        "string.length": "O campo estado deve conter exatamente 2 caracteres",
    }),
});
