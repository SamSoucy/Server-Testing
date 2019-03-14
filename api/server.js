const express = require('express');
const server = express();
const users = require('../users/usersModel');
server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json("message: working");
});
 
server.get('/users', (req,res) => {
    res.status(200).json({name: "Kim", age: 32, occupation: "student"});
});
 
server.post('/users', (req,res) => {
    const user = req.body;
    const name = user.name;
    const age = user.age;
    const occupation = user.occupation;
    if(!name) res.status(422).json({msg:`name is missing`});
    if(!age) res.status(422).json({msg:`age is missing`});;
    if(!occupation) res.status(422).json({msg:`occupation is missing`});;
    users.insert(user)
         .then( ids => {
            console.log(ids);
            res.status(201).json(ids);
         })
         .catch(err => {
            res.status(500).json({err:`Cannot add a user at this time`});
         })
});
        
module.exports = server;