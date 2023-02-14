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
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      'mongodb+srv://mdunnmon:seasoning789@recipestorage.n4vrfhq.mongodb.net/?retryWrites=true&w=majority',
      connectionParams
    );
    console.log('Successfully connected to database');
  } catch (error) {
    console.log(error);
    console.log('Failed to connect to database');
  }
});
//calling database
database();

//define route handlers
app.use('/api', recipeRouter);

// app.get('/api', (req, res) => {
//   res.send('Hello from express!');
// });

// app.get('*', function (request, response) {
//   response.sendFile(__dirname + 'client/index.html');
// });

//catch all route handler
app.use((req, res) => res.status(404).send('This page does not exist'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
