import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.port || 9000;

app.use(bodyParser.json());
app.use(compression());
app.use(cors());

app.listen(port, () => {
  console.log('Server running on port:', port);
});
