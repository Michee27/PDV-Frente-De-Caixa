const client = require('../data/queryClient');
const formatarCpf = require('../utils/cpfFormat');


const addClients = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    try {

        const existe_email = await client.get_client_by_email(email);
        console.log(existe_email);

        if (existe_email.length > 0) {
            return res.status(400).json({ message: 'Já existe uma conta com o email informado' })
        }

        const existe_cpf = await client.get_client_by_cpf(cpf);

        if (existe_cpf.length > 0) {
            return res.status(400).json({ message: 'Já existe uma conta com o cpf informado' })
        }


        await client.register_client(nome, email, cpf, cep, rua, numero, bairro, cidade, estado)

        return res.status(201).json({
            message: 'Cliente cadastrado com sucesso!'
        })
    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}

const listClients = async (req, res) => {
    try {
        const clientes = client.get_clients()
        return res.status(200).json(clientes)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const editClient = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const { id } = req.params
    try {
        const existe_cliente = await client.get_client_details(id);

        if (!existe_cliente) {
            return res.status(404).json({ message: `não existe cliente para a id ${id} informado.` })
        }

        const existe_email = await client.get_client_by_email(email);

        if (existe_email.length > 0 && email !== existe_cliente.email) {
            return res.status(400).json({ message: `Já existe uma conta com o email ${email} informado` })
        }

        const existe_cpf = await client.get_client_by_cpf(cpf);

        if (existe_cpf && existe_cpf.id !== id) {
            return res.status(400).json({ message: 'Já existe uma conta com o cpf informado' })
        }

        await client.update_cliente(nome, email, cpf, cep, rua, numero, bairro, cidade, estado, id)
        return res.status(200).json({
            message: 'Cliente atualizado com sucesso!'
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getClientDetails = async (req, res) => {
    const { id } = req.params
    try {
        let request = await client.get_client_details(id);

        if (!request) {
            return res.status(404).json({ message: `Usuario com id ${id} não encontrado` })
        }
        request.cpf = formatarCpf(request.cpf)
        return res.status(200).json(request);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    addClients,
    editClient,
    listClients,
    getClientDetails
}