const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('../models/Post');

const uri = 'mongodb://Luq:Haslo1@cluster0-shard-00-00-gw1sh.mongodb.net:27017,cluster0-shard-00-01-gw1sh.mongodb.net:27017,cluster0-shard-00-02-gw1sh.mongodb.net:27017/TodoList?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const db = mongoose.connect(uri, {useNewUrlParser: true}, () => {
    console.log('connected');
    
});


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.use((req,res,next) => {
    console.log('Connection');
    next();
})

router.route('/posts')
    .post((req,res) =>{
    const newTodo = req.body;
    Post.create({
        text: newTodo.text,
        completed: newTodo.completed
    }, (err, post) => {
        if(err) res.status(500).send('There was a problem creating post.')

        res.status(200).send('Post created.')
        })
    })
        
    .get((req,res) => {
        Post.find((err,posts) => {
            if(err) res.status(500).send('Error on the sever.');
            if(!posts) return res.status(404).send('No posts found.');
            res.status(200).json(posts);
        })
    })


router.route('/posts/:post_id')
    .get((req,res) => {
        Post.findById(req.params.post_id, (err,post) => {
            if(err) res.status(500).send('Error on the sever.');
            if(!post) return res.status(404).send('No post found.');
            res.json(post);
        })
    })

    .put((req,res) => {
        Post.findById(req.params.post_id, (err,post) => {
            if(err) res.status(500).send('Error on the sever.');
            if(!post) return res.status(404).send('No post found.');
                post.completed = req.body.completed;
                if(req.body.text){
                    post.text = req.body.text;
                }

                post.save(err => {
                    if(err) res.status(500).send('Error on the sever.');
                    
                    res.status(200).json({message: 'Post updated'}); 
                })
        })
    })

    .delete((req,res) => {
        Post.deleteOne({_id: req.params.post_id}, (err,post) => {
            if(err) res.status(500).send('Error on the sever.');
            if(!post) return res.status(404).send('No post found.');
            res.status(200).json({ message: 'Successfully deleted' })
        })
    })

module.exports = router;