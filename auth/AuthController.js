const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcryptjs');

const User = require('../models/User');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req,res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        login: req.body.login,
        password: hashedPassword,
        email: req.body.email
    }, (err, user) => {
        if(err) return res.status(500).send('There was problem registering the user.')

        res.status(200).send({ auth: true });
    });
});

router.post('/login', (req,res) => {
    User.findOne({ login: req.body.login }, (err,user) => {
        if(err) return res.status(500).send('Error on the sever.');
        if(!user) return res.status(404).send('No user found.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).send({ auth: false });

        res.status(200).send({ auth: true });
    });
});

module.exports = router;