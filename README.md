# Lab Back-End Avan�ado

Experimento de cria��o de microservices com uma API Java que se comunica com uma API em NodeJS

## Executando a API Java
`estoque-api >> Maven >> Update Project`
`estoque-api >> Application.java >> Run as >> Java Application`

## Executando a API NodeJS

#Iniciando o Mongo
Program Files\MongoDB\Server\3.4\bin>`mongod.exe`

### Instale as depend�ncias

`npm install express body-parser mongoose node-restful mongoose-paginate lodash express-query-int pm2 --save`

Essa opera��o baixa e instala, na pasta `node_modules` todas as depend�ncias. Isso pode demorar alguns minutos. A pasta `node_modules` n�o deve ir para o controle de vers�o.

O par�metro `--save` do comando `npm install` inclui as depend�ncias no arquivo `package.json`.

`npm install axios@0.16.2 --save`

### Instale as depend�ncias de desenvolvimento

`npm i nodemon --save-dev`

Essa depend�ncia ser� usada apenas durante o desenvolvimento.

### Defina os scripts de execu��o

Inclua os scripts `dev` e `production` da seguinte forma. 

```
...
"scripts": {
  "dev": "nodemon",
  "production": "pm2 start index.js --name venda-api
},
...
```

Nesse ponto as API'S j� est�o prontas para serem testadas. 

###Para Testar a `estoque-api` persista um produto via `POST`
`http://localhost:9090/estoque-api/produtos`   |   `{"codigo":"NT0123","nome":"Notebook i7","marca":"MACOS"}`
Ap�s o produto ser persistido, internamente na `estoque-api` ser� enviado um `POST` para venda-api para que a mesma saiba da existencia do um novo produto.

Agora se fizer um `GET` em `estoque-api`
`http://localhost:9090/estoque-api/produtos`
O `novo` produto estar� l�.

Se tamb�m fizer um `GET` em `venda-api` ver� o `novo` produto
`http://localhost:5005/api/produtosRecentementeCadastrados`

###Para Testar a `venda-api` fa�a uma venda via `POST`
`http://localhost:5005/api/vendas/`      |    `{"idItemEstoque": 2, "estoque":1, "produto":1, "quantidade":500, "data": null}`
A data n�o precisa ser informada, pois internamente a `venda-api` pegar� o hor�rio atual da opra��o. 
Ap�s a submiss�o do `POST`, internamente na `venda-api`ser� feita uma consulta via `GET` `( get('http://localhost:9090/estoque-api/itensEstoque/'+req.body.idItemEstoque) )` 
na `estoque-api` para verificar se o item da venda existe.  Caso exista! Internamente a `venda-api` fara uma nova requisi��o, s� que dessa vez via 
`POST` `( post('http://localhost:9090/estoque-api/itensEstoque/', produto) )` para 
atualizar o estoque e registrar a movimenta��o do mesmo na `estoque-api`.
