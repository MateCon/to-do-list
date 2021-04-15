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

// app.get('/employees', (req, res) => {
//     db.query('SELECT * FROM employees',
//     (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// });

app.listen(port, () => {
    console.log(`Your server is running on port ${port}.`)
});