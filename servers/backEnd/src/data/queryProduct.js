const knex = require('../config/connection');

module.exports = {
    async register_product(object) {
        return await knex("produtos").insert({
            descricao: object.descricao,
            quantidade_estoque: object.quantidade_estoque,
            valor: object.valor,
            categoria_id: object.categoria_id,
        }).returning('*');
    },

    async update_product(object, id) {
        await knex("produtos").update({ 
            descricao: object.descricao,
            quantidade_estoque: object.quantidade_estoque,
            valor: object.valor,
            categoria_id: object.categoria_id,
         }).where({ id });
        
    },

    async upload_product_photo(id, photoUrl) {
        await knex("produtos").update({ produto_imagem: photoUrl }).where({ id })
    },

    async get_product() {
        return await knex('produtos').orderBy('id', "asc");
    },

    async get_product_by_category_id(categoria_id) {
        return await knex('produtos').where({ categoria_id }).orderBy('id', "asc")
    },

    async get_product_by_id(id) {
        return await knex('produtos').where({ id }).first();
    },

    async delete_product(id) {
        await knex.delete('*').from('produtos').where({ id });
    }
}