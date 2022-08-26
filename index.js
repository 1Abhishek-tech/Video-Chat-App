const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(8000, () => {
    console.log('Server started on port 3000');
});