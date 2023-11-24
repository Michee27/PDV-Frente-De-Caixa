const {get_categories} = require('../data/queryCategory');

module.exports = {
    async getCategories(req, res) {
        const categories = await get_categories()
        return res.status(200).json(categories)
    }
}