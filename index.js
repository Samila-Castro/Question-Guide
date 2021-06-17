const { request, response } = require('express');
const express = require('express');
const app = express();

const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//Database
connection.authenticate()
.then(() => {
    console.log("Conexão ok!");
})
.catch((msgErro) => {
    console.log(msgErro);

})

//Express usar EJS como view engine(renderizador de html)
app.set('view engine','ejs');

app.use(express.static('public'));

//Traduz os dados enviados pelo form em uma estrutura js que dá pra utilizar no back-end (json)
//disponibiliza o object body!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (request, response) => {
    response.render("index");
});

app.get("/perguntar", (request, response) => {
    response.render("perguntar");
});

app.post("/salvarpergunta", (request, response) => {
    //recebe os dados da requisição no corpo da requisição, em um objeto -> JSON
    const titulo = request.body.título;
    const descricao = request.body.descrição;
    //create == insert into
    Pergunta.create({
        titulo: titulo ,
        descricao: descricao
    }).then(() => {
        response.redirect("/");
    });

});

app.listen(3333, () => {
    console.log("App rodando!");
});