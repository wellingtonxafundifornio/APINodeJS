const  ProdutoRecente = require('./produtoRecente')

ProdutoRecente.methods(['get', 'post', 'put', 'delete'])
ProdutoRecente.updateOptions({new: true, runValidators: true})

module.exports = ProdutoRecente