import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

(async () => {
  dotenv.config();

  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  const app = express();
  const port = process.env.port || 9000;

  app.use(bodyParser.json());
  app.use(compression());
  app.use(cors());

  // Expenses
  app.get('/api/expenses', (req, res) => {});

  // Expense Groups
  app.get('/api/expense-groups/:id?', (req, res) => {
    const { id } = req.params;
  });

  app.post('/api/expense-groups', (req, res) => {
    const { body } = req;
  });

  app.listen(port, () => {
    console.log('Server running on port:', port);
  });
})();
