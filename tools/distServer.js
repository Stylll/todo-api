import express from 'express';
import path from 'path';
import open from 'open';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import routes from '../server/routes/route';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Api routes
routes(app);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
