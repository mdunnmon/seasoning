const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const app = express();
require('dotenv').config();
//import router
const recipeRouter = require('./routes/recipeRouter.js');
const PORT = 3000;

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting to database function
const database = (module.exports = () => {
  //parameters for connecting to database
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  //try to connect to database with the associated URI, and the connectionParams which we have declared
  try {
    mongoose.connect(process.env.MONGODB_URI, connectionParams);
    //log if connection is successful
    console.log('Successfully connected to database');
    //catch block if there is an error
  } catch (error) {
    console.log('Failed to connect to database');
  }
});
//calling database
database();

//define route handlers. when routes use a /api then it gets sent to the recipeRouter
app.use('/api', recipeRouter);

// DEVELOPMENT //
// app.use(express.static(path.resolve(__dirname, '../client')));

// PRODUCTION //
app.use(express.static(path.join(__dirname, '../dist/')));

//catch all route handler
app.use((req, res) => res.status(404).send('This page does not exist'));

// SSL certificate and private key
// const options = {
//   key: fs.readFileSync('/path/to/your/ssl/key'),
//   cert: fs.readFileSync('/path/to/your/ssl/certificate'),
// };

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });

//Non https creation
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
