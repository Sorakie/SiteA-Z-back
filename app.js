const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/workshop', {
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
})
.then(() => console.log("connect success"))
.catch(err => console.log(err))

app.get('/', function(req, res) {
    res.send("ok");
})

app.use('/api', userRoutes);

const server = http.createServer(app);
server.listen(8080)