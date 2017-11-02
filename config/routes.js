const express = require('express')

module.exports = function(server) {

  // API Routes
  const router = express.Router()
  server.use('/api', router)

  // rotas da API
  const alunoService = require('../api/aluno/alunoService')
  alunoService.register(router, '/alunos')

  const testeService = require('../api/teste/testeService') //testeService.js
  testeService.register(router, '/testes')

  const produtoRecentementeChegadoNoEstoqueService = require('../api/produtoRecente/produtoRecenteService')
  produtoRecentementeChegadoNoEstoqueService.register(router, '/produtosRecentementeCadastrados')

  const vendaService = require('../api/venda/vendaService') //testeService.js
  vendaService.register(router, '/vendas')

}
