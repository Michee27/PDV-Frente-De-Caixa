const knex = require('../config/connection');

module.exports = {
    async register_user({ nome, email, encryptPassword }) {
        await knex('usuarios').insert({ nome, email, senha: encryptPassword })
    },

    async get_user_by_email(email) {
        return await knex("usuarios").where("email", email).first()
    },

    async update_user(object, id) {
        await knex("usuarios").update({ nome: object.nome, email: object.email, senha: object.senha }).where('id', id)
    },

    async infoUser(id) {
        return await knex("usuarios").where({ id }).first();
    }
}