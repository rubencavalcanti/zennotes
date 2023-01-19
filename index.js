const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));


//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() => {
        console.log('conexão com banco de dadados ativa')
    }).catch(err => {
        console.log(err)
    })
    
//models
const Category = require('./categories/Category');

//controllers
const categoriesController = require('./categories/categoriesController')

//routers 
app.use('/', categoriesController)


//rotas

//renderizar home
app.get('/', (req, res) => {
    res.render('index')
})


//rodar o servidor
app.listen(3000, () => {
    console.log("O servidor está rodando!")
})