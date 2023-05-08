const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3001;

const bancozada = mysql.createConnection({
    host: '192.168.150.168',
    user: 'fatec',
    password: '11',
    database: "entrega3"
});

app.use(cors());
app.use(express.json());

app.post('/create', (req, res) => {
    const { name, email, password } = req.body
    let query = 'INSERT INTO usuario ( Nome, Email, Senha ) VALUES ( ?, ?, ? )';
    bancozada.query(query, [name, email, password], (err, result) => {
        console.log(err)
    })
})

app.get('/view', (req, res) => {
    let query = 'SELECT * FROM usuario'
    bancozada.query(query, (err, result) => {
        err ? console.log(err) : res.send(result)
    })
})

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    let query = 'SELECT * FROM usuario WHERE id = ?';
    bancozada.query(query, [id], (err, result) => {
        err ? console.log(err) : res.send(result)
    })
})

app.put('/update', (req, res) => {
    const { id, name, email, password } = req.body;
    let query = 'UPDATE usuario SET Nome = ?, Email = ?, Senha = ? where id = ?';

    bancozada.query(query, [name, email, password, id], (err, result) => {
        err ? console.log(err) : res.send(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    let query = 'DELETE FROM usuario WHERE id = ?';

    bancozada.query(query, [id], (err, result) => {
        err ? console.log(err) : res.send(result)
    })
})

bancozada.connect(error => {
    if (error) {
        console.log("A error has been occured "
            + "while connecting to database.");
        throw error;
    }

    //If Everything goes correct, Then start Express Server
    app.listen(PORT, () => {
        console.log("Server is Listening on Port ", PORT);
    })
})