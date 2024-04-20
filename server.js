// Description: This file is the entry point for the application. It starts the server and listens on port 3000.
const express = require('express');
const app = express();
require('./db');
const cors = require('cors')
require('dotenv').config();
let bodyParser = require('body-parser');

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

//Controllers
const userController = require('./controllers/userController');
app.use('/api', userController);

let counters = [
  {id: 1, title: 'Quiet Time', count: 0, description: 'Quiet Time for 2 hours'},
  {id: 2, title: 'Study', count: 0, description: 'Study for 2 hours'},
  {id: 3, title: 'Sugar Fast', count: 0, description: 'Avoid sugar for 1 day'}
]

app.get('/api/counters/:counter?', (req, res) => {
  if (req.params.counter) {
    const counterId = parseInt(req.params.counter); 
    const counter = counters.find(c => c.id === counterId);
    if (counter) {
      return res.json([counter]);
    } else {
      return res.status(404).json({ error: 'Counter not found' });
    }
  } else {
    return res.json(counters);
  }
});


app.post('/api/counters/', (req, res) => {
  const counter = req.body;
  counter.id = counters.length + 1;
  counters.push(counter);
  return res.json(counter);
});

app.delete('/api/counters/:counter?', (req, res) => {
  if (req.params.counter) {
    const counterId = parseInt(req.params.counter); 
    const counter = counters.find(c => c.id === counterId);
    if (counter) {
      counters = counters.filter(c => c.id !== counterId);
      return res.json(counter);
    } else {
      return res.status(404).json({ error: 'Counter not found' });
    }
  } else {
    return res.status(400).json({ error: 'Counter id is required' });
  }
})



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});