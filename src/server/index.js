import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import schemas from './schemas';

(async () => {
  dotenv.config();

  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  const app = express();
  const port = process.env.port || 9000;

  const { expenses, expenseGroups } = schemas;

  app.use(bodyParser.json());
  app.use(compression());
  app.use(cors());

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connected to database');
  });

  // Expenses
  app.get('/api/expenses', async (req, res) => {
    try {
      const data = await expenses.find({});
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Expense Groups
  app.get('/api/expense-groups/:id?', async (req, res) => {
    try {
      const { id } = req.params;
      const expenseGroup = await expenseGroups.findById(id);
      res.status(200).send(expenseGroup);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post('/api/expense-groups', (req, res) => {
    const { body } = req;
  });

  app.listen(port, () => {
    console.log('Server running on port:', port);
  });
})();
