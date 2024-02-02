const express = require('express')
const app = express()
const cors = require('cors');
const { connect } = require('mongoose');
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

require('dotenv').config()

app.use(cors());
app.use(express.json())


const uri = process.env.Atlas_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
    // useCreateIndex:true,
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection successful..')
})

//Setting Router

const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})