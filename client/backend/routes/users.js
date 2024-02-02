const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

router.route('/').get((req,res)=>{
    User.find()
    .then(users => res.json(users))//get all the users and return users in json format
    .catch(err => res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const newUser = new User({username}); 

    newUser.save()
    .then(()=> res.json('User added bro..'))
    .catch(err => res.status(400).json('Error: ' + err ))
})


module.exports = router