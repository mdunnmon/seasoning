const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
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
    mongoose.connect(
      'mongodb+srv://mdunnmon:seasoning789@recipestorage.n4vrfhq.mongodb.net/?retryWrites=true&w=majority',
      connectionParams
    );
    //log if connection is successful
    console.log('Successfully connected to database');
    //catch block if there is an error
  } catch (error) {
    console.log(error);
    console.log('Failed to connect to database');
  }
});
//calling database
database();

//define route handlers. when routes use a /api then it gets sent to the recipeRouter
app.use('/api', recipeRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'path', 'to', 'index.html'));
// });
app.use(express.static(path.resolve(__dirname, '../client')));

//catch all route handler
app.use((req, res) => res.status(404).send('This page does not exist'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
