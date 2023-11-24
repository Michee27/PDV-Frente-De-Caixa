const joi = require('joi');

module.exports = joi.object({
    cliente_id: joi.number().integer().required().messages({
      required: "O ID do cliente deve ser fornecido.",
    }),
  observacao: joi.string(),
    pedido_produtos: joi.array().required().items(
      joi.object({
        produto_id: joi.number().integer().required().messages({
          required: "O ID do produto deve ser fornecido.",
        }),
        quantidade_produto: joi.number().integer().required().messages({
          required: "A quantidade do produto deve ser fornecida.",
        }),
      })
    ),
  });