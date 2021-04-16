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

app.post('/updateCompletion', (req, res) => {
    const id = req.body.id;
    const is_compleated = req.body.is_completed;
    console.log(id, is_compleated);
    db.query('UPDATE Task SET is_completed = ? WHERE id = ?',
    [is_compleated, id],
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/deleteTask', (req, res) => {
    const id = req.body.id;

    console.log(id);
    db.query(`DELETE FROM Task WHERE id=${id}`,
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/getTasks', (req, res) => {
    const user_id = req.body.user_id;
    
    db.query('SELECT * FROM ToDoList.Task WHERE user_id=?',
    [user_id],
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