## Desafio Modulo V - Sistema PDV

### Introdução
Seja bem vindo ao sistema de ponto de venda (PDV)

Um sistema de PDV (Ponto de Venda) é uma ferramenta de software essencial para estabelecimentos comerciais. Ele permite o registro de vendas, aceita diferentes formas de pagamento, emite recibos e gerencia o estoque. Além disso, fornece relatórios detalhados de vendas e pode se integrar a outras ferramentas de negócios.
___________________

### Primeira Sprint:

Nessa primeira sprint foi implementado o banco de dados e foi criado e alguns endpoints para o PDV.

Inicialmente foi implementado o cadastro de usuários, login com email e senha e atualização do perfil do usuário.

## Uso básico
API funciona na URL: http://localhost:3000 e pelos links do - [Frontend](https://frentedeloja.netlify.app/) ou no link [Backend](https://backendfrentedeloja.onrender.com/login). Antes de iniciar é necessário fazer o clone do repositório, baixar as dependências e por fim configurar um arquivo .env no diretorio raiz do projeto conforme o exemplo abaixo:

````
git clone https://github.com/exemplo-backend/exemplo-backend-git

npm install ou npm i - Para baixar todas as dependências
```````

```
PORT=

DB_HOST= 

DB_PORT=

DB_USER=

DB_PASS=

DB_NAME=

JWT_PASS=
```

### após a confiiguração basta apenas chamar as seguintes rotas:

`GET` `/categoria` - Lista todos as categorias

`POST` `/usuario` - Cadastra um novo usuário

`POST` `/login` - Login com email e senha

`PUT` `/usuario` - Atualiza o perfil do usuário

### Segunda Sprint:

Nessa segunda sprint foi implementado mais algumas rotas para o PDV e também às tabelas produtos e clientes com a intenção de cadastrar produtos e clientes e manter o sitema funcionando corretamente, segue abaixo as rotas:


`POST` `/produto` - Cadastra um novo produto

`PUT` `/produto/:id` - Atualiza dados do produto

`GET` `/produto` - Lista todos os produtos

`GET` `/produto/:id` - Detalha um produto

`DELETE` `/produto/:id` - Exclui um produto

`POST` `/cliente` - Cadastra um novo cliente

`PUT` `/cliente/:id` - Atualiza dados do cliente

`GET` `/cliente` - Lista todos os clientes

`GET` `/cliente/:id` - Detalha um cliente

Essas rotas foram implementadas com o objetivo de melhorar a qualidade do sistema.

### Tecnologias usadas

- [node](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [insomnia](https://insomnia.rest/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [joi](https://www.npmjs.com/package/joi)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [knex](https://www.npmjs.com/package/knex)
- [pg](https://www.npmjs.com/package/pg)
- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### Testes

- [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)

### Autores

* **Augusto Izepon** - *Projeto PDV* - [augustoizepon](https://github.com/augustoizepon)
* **Daniel Hermes** - *Projeto PDV* - [HermesdMatos](https://github.com/HermesdMatos)
* **Addhyel Martins** - *Projeto PDV* - [Addmartins](https://github.com/Addmartins)
* **Michée Celestin** - *Projeto PDV* - [Michee27](https://github.com/Michee27)
* **Cauã Xavier** - *Projeto PDV* - [Cauaxavier](https://github.com/Cauaxavier)
