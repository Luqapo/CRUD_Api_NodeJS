const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('./public/'));

const PORT = process.env.PORT || 5000;

const uri = 'mongodb://Luq:Haslo1@cluster0-shard-00-00-gw1sh.mongodb.net:27017,cluster0-shard-00-01-gw1sh.mongodb.net:27017,cluster0-shard-00-02-gw1sh.mongodb.net:27017/TodoList?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const db = mongoose.connect(uri, {
    useNewUrlParser: true
}, () => {
    console.log('Connected to database.');
});

const AuthController = require('./auth/AuthController');
const TodoController = require('./todo/TodoController');

app.use('/api/auth', AuthController)
app.use('/api', TodoController);

app.listen(PORT, () =>{
    console.log(`Server listen at port ${PORT}`);
});