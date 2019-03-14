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
    if(!name) res.status(422).json({message: "name is missing"});
    if(!age) res.status(422).json({message: "age is missing"});;
    if(!occupation) res.status(422).json({message:"occupation is missing"});;
    users.insert(user)
         .then( ids => {
            console.log(ids);
            res.status(201).json(ids);
         })
         .catch(err => {
            res.status(500).json({err:"Cannot add a user at this time"});
         })
});

server.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    if (!id) res.status(404).json({ message: "no id" });
    users.findById(id)
        .then(userId => {
            if(userId[0]) {
                users.remove(userId[0])
                    .then(ids => {
                        res.status(200).json({ message: "user is deleted" });
                    })
                    .catch(err => {
                        res.status(500).json({ message: "Something went wrong" });
                    });
                } else {
                   res.status(404).json({message:"There is no user with this id"});
                }      
        })
        .catch(error => {
            res.status(500).json({error: "There is something wrong the server"});
        });
})
        
module.exports = server;