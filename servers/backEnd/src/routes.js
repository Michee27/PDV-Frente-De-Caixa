const routes = require("express").Router()
const multer = require("./middlers/multer")

const { registerUser, updateUser, getUser } = require("./controllers/user")
const { login } = require("./controllers/login")

//instacias products
const {
    updateProduct,
    detailProducts,
    deleteProducts,
    registerProduct,
    listProduct,
    uploadProductPhoto
} = require('./controllers/products');

const { checkEmail, validateBody, checkEmailtoUpdate } = require("./middlers/validations")
const { validateProducts, deleteProductsById } = require("./middlers/validate-products")
const userLoginMiddeware = require('./middlers/authentications')

const userLogin = require('./schemas/user-login')
const userUpdate = require('./schemas/user-update')
const userRegister = require("./schemas/user-register")
const productRegister = require("./schemas/product-register");
const clientRegister = require("./schemas/client-register");
const orderRegister = require("./schemas/order-register");

const { getCategories } = require("./controllers/categorias")
const { addClients, listClients, editClient, getClientDetails } = require("./controllers/cliente");
const { addPedidos, listPedidos } = require("./controllers/pedidos");

routes.post('/usuario', validateBody(userRegister), checkEmail, registerUser)
routes.post('/login', validateBody(userLogin), login)
routes.get('/categoria', getCategories)

routes.use(userLoginMiddeware);

routes.put('/usuario', validateBody(userUpdate), checkEmailtoUpdate, updateUser)
routes.get('/usuario', getUser)

//routes clients
routes.post('/cliente', validateBody(clientRegister) ,addClients)
routes.get('/cliente', listClients)
routes.put('/cliente/:id', validateBody(clientRegister), editClient)
routes.get('/cliente/:id', getClientDetails)

//routes products
routes.post('/produto', multer.single("imagem"), validateBody(productRegister), registerProduct)
routes.put('/produto/:id', multer.single("imagem"),validateProducts, validateBody(productRegister), updateProduct)
routes.get('/produto', listProduct)

routes.get('/produto/:id', validateProducts, detailProducts)
routes.delete('/produto/:id', deleteProductsById, deleteProducts)

routes.post('/pedido', validateBody(orderRegister), addPedidos)
routes.get('/pedido', listPedidos)


module.exports = routes