const express = require('express');
const app = express();

app.listen(3001, () => console.log('I am listening on port 3001'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response) => {
    console.log('I got the message!!!');
    console.log(request.body.symbol);
    const data = request.body;
    response.json({
        status:'OK, message arrived!!!',
        content: data.symbol
    });
});