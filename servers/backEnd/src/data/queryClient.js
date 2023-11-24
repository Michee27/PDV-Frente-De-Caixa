const knex = require('../config/connection');

module.exports = {
    async register_client(nome, email, cpf, cep, rua, numero, bairro, cidade, estado ) {
        await knex('clientes').insert({
            nome: nome,
            email: email,
            cpf: cpf,
            cep: cep, 
            rua: rua,
            numero: numero, 
            bairro: bairro, 
            cidade: cidade, 
            estado: estado 
        })
    },

    async get_clients() {
        return await knex.select('*').from('clientes')
    },

    async update_cliente(nome, email, cpf, cep, rua, numero, bairro, cidade, estado, id) {
        await knex("clientes").update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado}).where({ id })
    },

    async get_client_details(id) {
        return await knex.select('*').from('clientes').where('id', id).first();
    },

    async get_client_by_email(email) {
        return await knex("clientes").where({ email })
    },

    async get_client_by_cpf(cpf) {
        return await knex("clientes").where({ cpf })
    }

}