const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

//require routers
const recipesRouter = require('./routes/recipes');

//router handler
app.use('/home', recipesRouter);

app.get('/api', (req, res) => {
  res.send('Hello from express!');
});

app.get('*', function (request, response) {
  response.sendFile(__dirname + 'client/index.html');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
//hi
