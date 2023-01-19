const express = require('express');
const app = express();

// Web Server side app

app.listen(3001, () => console.log('I am listening on port 3001'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// Rest API routes

app.post('/api', (request, response) => {
    console.log('I got the message!!!');
    console.log(request.body.symbol);
    const data = request.body;
    response.json({
        status:'OK, message arrived!!!',
        content: data.symbol
    });
});

// Database connection

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: '1234',
    database: 'employees_mod',
    port: 6703
});

connection.connect(function(err){
    if(err){
        return console.error('error: ' + err.message);
    }
    console.log('Already connected to MySQL server DB!!!!');
  });

const sql = "SELECT dept_no FROM t_departments limit 2";

connection.query(sql, function (err, result, fields){
    if (err) throw err;
    for (var i = 0; i < result.length; i++){
        var row = result[i];
        console.log("Department Number: ", row.dept_no, "&", "Department Name: ", row.dept_name);
    }
    console.log(result);
});
