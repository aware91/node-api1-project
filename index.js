const express = require('express');
const shortid = require('shortid');

const server = express();

let user = [];

server.use(express.json());

server.get('/', (req, res)=>{
  res.json({User: 'User and Bio'});
});

const PORT = 5000;
server.listen(PORT, ()=>{
  console.log('listening on localhost:', PORT)
});

// Create
server.post('/api/users', (req, res)=>{
  const Created = req.body;
  Created.id = shortid.generate();
  user.push(Created);
  res.status(201).json(Created);
});

// Read
server.get('/api/users', (req, res)=>{
  res.status(200).json(user);
});

server.get('/api/users/:id', (req, res)=>{
  const {id} = req.params;
  const userId = user.find(users => users.id === id);
  if (userId) {
    user = user.filter(users => users.id !== id);
    res.status(200).json(userId)
  } else {
    res.status(404).json({message: 'The user with the specified ID does not exist.'})
  }
})

// Delete
server.delete('/api/users/:id', (req, res)=>{
  const {id} = req.params;
  const deleted = user.find(users => users.id === id);
  if (deleted) {
    user = user.filter(users => users.id !== id);
    res.status(200).json(deleted)
  } else {
    res.status(404).json({message: 'The user with the specified ID does not exist.'})
  }
})

// Update
server.put('/api/users/:id', (req, res)=>{
  const {id} = req.params;
  const changes = req.body;
  let index = user.findIndex(users => users.id === id);
  if (index !== -1) {
    // changes.id = id;
    user[index] = changes;
    res.status(200).json(user[index]);
  } else {
    res.status(404).json({ message: "The user with the specified ID does not exist."})
  }
})