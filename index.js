const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//tampilkan semua data product
app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//tampilkan data product berdasarkan id
app.get('/api/products/:id', (req, res) => {
    let sql = "SELECT * FROM product WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Tambahkan data product baru
app.post('/api/products', (req, res) => {
    let data = {
        name: req.body.name,
        price: req.body.price,
        id_category: req.body.id_category,
        id_cashier: req.body.id_cashier
    };
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Edit data product berdasarkan id
app.put('/api/products/:id', (req, res) => {
    let sql = "UPDATE product SET name='" + req.body.name + "', price='" + req.body.price + "', id_category='" + req.body.id_category + "', id_cashier='" + req.body.id_cashier +
        "' WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Delete data product berdasarkan id
app.delete('/api/products/:id', (req, res) => {
    let sql = "DELETE FROM product WHERE id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Server listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});