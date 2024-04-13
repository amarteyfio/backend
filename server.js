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

//Controllers
const userController = require('./controllers/userController');
app.use('/api', userController);





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});