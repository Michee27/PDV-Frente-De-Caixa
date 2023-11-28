const knex = require('../config/connection')
const client = require('../data/queryClient');
const product = require('../data/queryProduct');


module.exports = {
    async addPedidos(req, res) {
        const { cliente_id, observacao, pedido_produtos } = req.body

        try {
            const existe_cliente = await client.get_client_details(cliente_id);

            if (!existe_cliente) {
                return res.status(404).json({ message: `não existe cliente para a cliente_id ${cliente_id} informado.` })
            }

            let valorTotal = 0

            async function calcularValorTotal() {
                let boolean = true
                let i = 0
                for (const e of pedido_produtos) {

                    const produto = await knex.select('valor').from('produtos').where('id', e.produto_id).first();
                    if (!produto) {
                        i++
                    }
                    valorTotal += produto.valor * e.quantidade_produto;
                }
                if(i != 0){
                    boolean = false
                    
                }
                return boolean
            }
            
            const validation = await calcularValorTotal();
            if(!validation){
                return res.status(404).json({ message: `Não existe produto para a produto informado.` });
            }

            const insert = await knex('pedidos').insert({ cliente_id: cliente_id, observacao: observacao, valor_total: valorTotal }).returning('id')

            async function processarPedido() {
                let boolean = true
                let i = 0
                
                for (const e of pedido_produtos) {
            
                    const produto = await knex.select('valor', 'quantidade_estoque').from('produtos').where('id', e.produto_id).first();
            
                    if (produto.quantidade_estoque < e.quantidade_produto) {
                        i++
                    }
            
                    await knex('pedido_produtos').insert({
                        produto_id: e.produto_id,
                        quantidade_produto: e.quantidade_produto,
                        pedido_id: insert[0].id,
                        valor_produto: produto.valor
                    });
            
                    await knex('produtos').update({ quantidade_estoque: produto.quantidade_estoque - e.quantidade_produto }).where('id', e.produto_id);
                }
                if(i != 0){
                    boolean = false
                    
                }
                return boolean

            }
            
        const validation2 = await processarPedido();
        if(!validation2){
            return res.status(404).json({ message: `Não existe estoque para a produto informado.` });
        }
        if(valorTotal <= 0){
            return res.status(400).json({
                message: 'o valor do pedido não pode ser menos ou igual a zero'
            })
            }
            
        return res.status(201).json({ message: 'Pedido feito com sucesso!' })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    async listPedidos(req, res) {
        const { cliente_id } = req.query;

        try {

            let pedidos = []

            if(!cliente_id) {
                pedidos = await knex('pedidos');
            } else {
                pedidos = await knex('pedidos')
                .where({ cliente_id });
            }

            if(pedidos.length === 0) {
                return res.status(400).json({ message: "Não existe nenhum pedido."});
            }

            for (const pedido of pedidos) {
                
                const pedido_produtos = await knex('pedido_produtos')
                .where({ pedido_id: pedido.id })
                .select('*')

                pedidos.pedido_produtos = pedido_produtos;
                
            }

            return res.status(200).json(pedidos);
            
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }



}