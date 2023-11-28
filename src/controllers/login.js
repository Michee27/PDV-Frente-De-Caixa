const jwt = require('../config/jwt')
const bcrypt = require('bcrypt')
const queryUser = require('../data/queryUser')

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const user = await queryUser.get_user_by_email(email)

        if (!user) {
            return res.status(401).send({ message: 'Usuário ou Senha inválido' })
        }

        const checkPassword = await bcrypt.compare(senha, user.senha);

        if (!checkPassword) {
            return res.status(401).send({ message: 'Usuário ou Senha inválido' })
        }

        const token = jwt.createToken({ id: user.id })

        const { senha: _, ...userLogin } = user;

        return res.status(200).json({message: 'Logado com sucesso!', usuario: userLogin, token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    login
}
