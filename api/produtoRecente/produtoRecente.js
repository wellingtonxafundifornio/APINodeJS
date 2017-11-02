const restful = require('node-restful')
const mongoose = restful.mongoose

const produtoRecenteSchema = new mongoose.Schema({
    codigo:{type: String, required: true},
    nome: { type: String, required: true },
    marca: { type: String, required: true }
});

module.exports = restful.model('ProdutoRecente', produtoRecenteSchema);