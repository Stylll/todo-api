import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from '../server/routes/route';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

// Middleware
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Api routes
routes(app);

// React routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

export default app;

