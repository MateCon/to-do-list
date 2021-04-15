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

app.post('/create', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    db.query('INSERT INTO user (name, password) VALUES (?,?)', 
    [name, password], 
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send('Values Inserted');
        }
    });
});

app.post('/user', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    db.query('SELECT * FROM ToDoList.User WHERE name = ? and password = ?',
    [name, password],
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/createTask', (req, res) => {
    const user_id = req.body.user_id;
    const content = req.body.content;
    const is_compleated = req.body.is_completed;
    console.log(user_id, content, is_compleated);

    db.query('INSERT INTO Task (user_id, content, is_completed) VALUES (?,?,?)',
    [user_id, content, is_compleated],
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.listen(port, () => {
    console.log(`Your server is running on port ${port}.`)
});