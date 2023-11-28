const joi = require('joi');

module.exports = joi.object({
    descricao: joi.string().min(5).required().messages({
        "string.empty": "A descrição não pode ser vazio",
        "any.required": "A descrição é obrigatória",
        "string.min": "A descrição deve ter pelo menos 5 caracteres"
    }),

    quantidade_estoque: joi.number().positive().required().messages({
        "number.base": "O campo 'quantidade_estoque' deve ser do tipo numérico.",
        "any.required": "O campo 'quantidade_estoque' é obrigatório",
        "number.positive": "O campo 'quantidade_estoque' tem que ser um número positivo"
    }),

    valor: joi.number().positive().required().messages({
        "number.base": "O campo valor deve ser do tipo numérico.",
        "any.required": "O campo valor é obrigatório",
        "number.positive": "O campo valor tem que ser um número positivo"
    }),

    categoria_id: joi.number().positive().required().messages({
        "number.base": "O campo 'categoria_id' deve ser do tipo numérico.",
        "any.required": "O campo 'categoria_id' é obrigatório",
        "number.positive": "O campo 'categoria_id' tem que ser um número positivo"
    }),
})