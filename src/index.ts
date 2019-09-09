import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { keys } from './config/keys';
import { router } from './routes';

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Mount REST on /api
app.use('/api', router);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
