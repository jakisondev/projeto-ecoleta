//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto  que irá fazer operações no banco de Dados
const db = new sqlite3.Database("./src/database/database.db")

//exportar o objeto db
module.exports = db

//utilzar o objeto de banco de dados, para nossas operações
db.serialize(() => {
    //criar uma tabela
    db.run(`
      CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
      );
    `)


    //inserir dados da tabela
    // const query = `
    //   INSERT INTO places (
    //       name, 
    //       image, 
    //       address, 
    //       address2, 
    //       state, 
    //       city, 
    //       items
    //     ) VALUES(?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "Papersider",
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     "Guilherme Gembala, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e Papelão"
    // ]

    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("cadastrado com sucesso!")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

    //consultar dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

    //deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")
    // })

})