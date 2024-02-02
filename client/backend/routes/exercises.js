const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise.model')

router.route('/').get((req,res)=>{
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: '+ err))
})
//{
//     "username":"Amit",
//     "description":"bike riding",
//     "duration":9,
//     "date":"2022-12-07T10:25:21.960Z"
// }

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);//converting to data datatype

    const newExercise = new Exercise({
        username,description,duration,date,
    });

    newExercise.save()
    .then(()=> res.json('exercise added!'))
    .catch(err => res.status(400).json('Error:'+err))
});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err ))
});

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=> res.json('exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err ))
});

router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>{
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
    
        exercise.save()
        .then(()=> res.json('exercise updated'))
        .catch(err => res.status(400).json('Error: ' + err ))
    })
    .catch(err => res.status(400).json('Error: ' + err ))
});
//we have to pass every entry while updating not only which you want to update
//e.g if updated everthing except number then show error for entering number

module.exports = router