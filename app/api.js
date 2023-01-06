import fetch from 'node-fetch';
import fs from "fs";
import express, { application } from 'express';
import pg from 'pg';

// Express

const app = express();
app.listen(3000, () => console.log('Listening at port 3000'))

// Database connection

const client =  new pg.Client({
   user: 'yon',
   host: 'localhost',
   database: 'test',
   password: 'rodrigo',
   port: 5432
});


client.connect();

const text = 'INSERT INTO sales(id, item) VALUES($1, $2) RETURNING *';
const values = ['1', 'brian'];
 
// callback
client.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
})


// await client.end();

// API information

const api_url = "https://api2.binance.com/api/v3/ticker/24hr";
  
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    const data = await response.json();
    //const jdata = JSON.stringify(data);
    //console.log(data);

    //fs.writeFile("test.json", jdata, function(err) {
    //if (err) {
    //    console.log(err);
    //}
    //});
    // client.connect();




    for( let i=0; i< data.length; i++){
      console.log(data[i]['symbol']);

      const text = 'INSERT INTO sales(id, item) VALUES($1, $2) RETURNING *';
      const values = [i, data[i]['symbol']];

      // callback
      client.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
          // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }
      })

    }
}

getapi(api_url);

// Server side

const app = express();
app.listen(3000, () => console.log('Listening at port: 3000'));
app.use(express.static('src'));


