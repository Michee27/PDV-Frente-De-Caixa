const knex = require('../config/connection')
const validateProducts = async (req, res, next) => {
    const id = req.params.id;
    try {
        const products = await knex.select('*').from('produtos').where({ id });
        if (products.length === 0) {
            return res.status(404).json({ message: 'O Produto informado não existe' });
        }
        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteProductsById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const products = await knex.select('*').from('produtos').where({ id });
        const productPurchase = await knex.select('*').from('pedido_produtos').where({ produto_id: id });
        
        if (products.length === 0) {
            return res.status(404).json({ message: 'O Produto informado não existe' });
        }
        if (productPurchase.length > 0) {
            return res.status(400).json({ message: 'O Produto inserido não pode ser excluído pois está na lista de pedidos' });
        }
        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    validateProducts,
    deleteProductsById
}