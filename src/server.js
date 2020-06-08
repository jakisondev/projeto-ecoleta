const express = require("express")
const server = express()

//pegar o objeto do banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do request.body da aplicação
server.use(express.urlencoded({ extended: true }))

//utilizando tamplate engine
const nunjcks = require("nunjucks")
nunjcks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//página inicial
server.get("/", (request, response) => {
    return response.render("index.html")
})

//página create
server.get("/create-point", (request, response) => {

    return response.render("create-point.html")
})

server.post("/savepoint", (request, response) => {
    const data = request.body
    console.log(data)

    //inserir dados no banco de dados
    const query = `
      INSERT INTO places (
          name, 
          image, 
          address, 
          address2, 
          state, 
          city, 
          items
        ) VALUES(?,?,?,?,?,?,?);
    `
    const values = [
        data.name,
        data.image,
        data.address,
        data.address2,
        data.state,
        data.city,
        data.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)

            return response.send("Erro no cadastro")
        }

        console.log("cadastrado com sucesso!")
        console.log(this)

        return response.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

//página search
server.get("/search", (request, response) => {

    const search = request.query.search

    // Pesquisa vazia
    if (search == "") {
        return response.render("search-results.html", { total: 0 })
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a página HTML com os dados do banco de dados
        return response.render("search-results.html", { places: rows, total })
    })
})

//ligar o servidor
server.listen(3000)