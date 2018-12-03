const express = require('express');

const app = express();
app.use(express.static('./public/'));

const PORT = process.env.PORT || 5000;

const AuthController = require('./auth/AuthController');
const TodoController = require('./todo/TodoController');

app.use('/api/auth', AuthController)
app.use('/api', TodoController);

app.listen(PORT, () =>{
    console.log(`Server listen at port ${PORT}`);
});