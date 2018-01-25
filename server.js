//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/q&a-list');
mongoose.Promise = global.Promise;

//on connection
mongoose.connection.on('connected', ()=>{
    console.log("Connected to database...");
});

mongoose.connection.on('Error', (err)=>{
    if(err){
        console.log('Error on db connection...' +err);
    }
});

//defining Schema
const answerSchema = mongoose.Schema({
    experience: {
        type: String,
        required: true
    },

    age: {
        type: String,
        required: true
    },
    
    diet: {
        type: String,
        required: true
    },
    
    rating: {
        type: String,
        required: true
    },
    
    package: {
        type: String,
        required: true
    },
});

const Answer = mongoose.model('Answer', answerSchema);

//adding middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/qa', (req, res, next)=>{
    let newAns = new Answer({
      experience: req.body.experience,
      age: req.body.age,
      diet: req.body.diet,
      rating: req.body.rating,
      package: req.body.package
    });

    newAns.save((err, qa)=>{
        if(err){
            res.json({msg: 'Failed to submit'});
        }
        else{
            res.json({msg: "Answers submit successfully"});
        }
    });
});

//listining server....
app.listen(port, ()=>{
    console.log("Server starting at port : - " +port);
});