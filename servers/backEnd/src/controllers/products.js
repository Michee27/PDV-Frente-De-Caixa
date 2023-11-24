const category = require('../data/queryCategory');
const product = require('../data/queryProduct');
const photoBucket = require('../utils/photoBubket');

const registerProduct = async (req, res) => {
    const { descricao, valor, quantidade_estoque, categoria_id } = req.body;
    const file = req.file

    try {

        const existeCategoria = await category.get_category_by_id(categoria_id);

        if (existeCategoria.length === 0) {
            return res.status(400).json({ message: 'categoria inexistente' })
        }

        let productObject = {
            descricao,
            valor,
            quantidade_estoque,
            categoria_id,
        }

        const produto = await product.register_product(productObject);
        
        if (file) {

            const id = produto[0].id

            const path = `produtos/${file.originalname}`
    
            const photo = await photoBucket.uploadFile(path, file.buffer, file.mimetype)

            await product.upload_product_photo(id, photo.path);

            productObject.produto_imagem = photo.url
        }

        return res.status(201).json(productObject)
    } catch (error) {
        return res.status(509).json({
            message: error.message
        })
    }

}

const listProduct = async (req, res) => {
    const { categoria_id } = req.query

    try {

        let products = await product.get_product()

        if (categoria_id) {
            products = await product.get_product_by_category_id(categoria_id);
        } 

        return res.status(200).json(products)
    } catch (error) {
        return res.status(509).json({
            message: error.message
        })
    }

}

const updateProduct = async (req, res) => {
    const { descricao, valor, quantidade_estoque, categoria_id } = req.body;
    const file = req.file;
    const id = req.params.id;
  
    try {
        const productObject = {
            descricao,
            valor,
            quantidade_estoque,
            categoria_id
        }
       
        await product.update_product(productObject, id);
    
        if (file) {
           
            let { produto_imagem: path } = await product.get_product_by_id(id)
          
            await photoBucket.deleteFile(path);

            path = `produtos/${file.originalname}`
            
            const photo = await photoBucket.uploadFile(path, file.buffer, file.mimetype)

            await product.upload_product_photo(id, photo.path);

            productObject.produto_imagem = photo.url
        }

        return res.status(201).json(productObject)
    } catch (error) {
        return res.status(509).json({
            message: error.message
        })
    }
}

const detailProducts = async (req, res) => {
    const id = req.params.id;
    try {
        const products = await product.get_product_by_id(id);

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteProducts = async (req, res) => {
    const id = req.params.id;
    try {
        const { produto_imagem: path } = await product.get_product_by_id(id);

        await photoBucket.deleteFile(path);

        await product.delete_product(id);

        return res.status(200).json({ message: 'O Produto foi excluído com sucesso!' })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    registerProduct,
    listProduct,
    updateProduct,
    detailProducts,
    deleteProducts
}