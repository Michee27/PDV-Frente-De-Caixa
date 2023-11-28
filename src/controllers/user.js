const bcrypt = require("bcrypt")
const queryUser = require("../data/queryUser");

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const encryptPassword = await bcrypt.hash(senha, 10)

        await queryUser.register_user({ nome, email, encryptPassword });

        return res.status(201).json({
            message: "Usuario cadastrado com sucesso"
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.userID
        const { senha:_, ...user } = await queryUser.infoUser(id);
      
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { nome, email, senha } = req.body
    const id = req.userID; 

    try {
        const encryptPassword = await bcrypt.hash(senha, 10)

        const userObject = {
            nome: nome,
            email: email,
            senha: encryptPassword
        }
        
        await queryUser.update_user(userObject, id);

        return res.status(200).json({
            message: "Usuario atualizado com sucesso"
        })

    } catch (error) {
        return res.status(509).json({ message: error.message })
    }
}

module.exports = {
    registerUser,
    updateUser,
    getUser
}
