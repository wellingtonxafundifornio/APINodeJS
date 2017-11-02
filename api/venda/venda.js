const restful = require('node-restful')
const mongoose = restful.mongoose

const vendaSchema = new mongoose.Schema({
    estoque :{type: Number, required: true}, //estoqueId
    produto: { type: Number, required: true }, //produtoId
    quantidade: { type: Number, required: true }
});

module.exports = restful.model('Venda', vendaSchema);