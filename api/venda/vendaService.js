const  Venda = require('./venda')
const axios = require('axios');

Venda.methods(['get', 'post', 'put', 'delete'])
Venda.updateOptions({new: true, runValidators: true})


Venda.after('post', callNext)

function callNext(req, res){
    console.log('Objeto da requisição -->> ', req.body);
    //console.log(JSON.parse(req.body))
    var produto = null;
    var date = new Date();
    req.body.data = date.toLocaleString();
    
   
    //verifica se existe produto
    axios.get('http://localhost:9090/estoque-api/itensEstoque/'+req.body.idItemEstoque)
  .then(response => {
      console.log(response.data)
    if(response.data != ''){
        produto = response.data;
        if(produto.quantidade < req.body.quantidade){
            res.status(400).json({"StatusVenda": "Não é possivel realizar uma venda com uma quantidade maior que o existe no estoque!"})
        }
        produto.quantidade = produto.quantidade - req.body.quantidade;
         console.log('Produto retornado da estoque-api: ', produto)

         //Atualiza a quantidade em estoque
            axios.post('http://localhost:9090/estoque-api/itensEstoque/', produto)
            .then(response => {
                res.status(200).json({"StatusVenda": "Venda inserida com sucesso!"})
            })
            .catch(error => {
                console.log('Erro no POST ItemEstoque ........', error);
            });

    }else{
        res.status(400).json({"resposta": "Não existe este item no Estoque"})
    }
  })
  .catch(error => {
    console.log('Erro no GET ItemEstoque.......',error);
  });




}



module.exports = Venda