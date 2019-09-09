import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { keys } from './config/keys';

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
})

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
