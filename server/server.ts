import path from 'path';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recipeRouter from './routes/recipeRouter';

dotenv.config();

const app: Express = express();
const PORT = 3000;

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not found in the environment variables.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const database = (): void => {
  try {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log('Successfully connected to database');
      })
      .catch((error) => {
        console.log('Failed to connect to database');
        console.error(error);
      });
  } catch (error) {
    console.log('Failed to connect to database');
    console.error(error);
  }
};
database();

app.use('/api', recipeRouter);

// DEVELOPMENT //
// app.use(express.static(path.resolve(__dirname, '../client')));

// PRODUCTION //
app.use(express.static(path.join(__dirname, '../dist/')));

app.use((req, res) => res.status(404).send('This page does not exist'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
