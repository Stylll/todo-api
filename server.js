import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes/route';

const app = express();
const port = parseInt(process.env.port, 10) || 3000;

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
/* GET home page. */
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to TODO' });
});

routes(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`app running on localhost:${port}`);
  }
});

export default app;

