const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());
app.use(express.json());

const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'ToDoList'
});

app.listen(port, () => {
    console.log(`Your server is running on port ${port}.`)
});