const knex = require('../config/connection')

module.exports = {
    async get_category_by_id(id) {
        return await knex("categorias").where({ id })
    },

    async get_categories() {
        return await knex("categorias")
    }
}