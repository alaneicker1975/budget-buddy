/* eslint-disable no-underscore-dangle */
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

  const { Expense, ExpenseGroup } = schemas;

  app.use(bodyParser.json());
  app.use(compression());
  app.use(cors());

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connected to database');
  });

  app.get('/api/expense-options/:id?', async (req, res) => {
    try {
      const { id } = req.params;
      const data = id
        ? await Expense.findById(id)
        : await Expense.find({}, null, { sort: { expense: 1 } });
      res.status(200).send({ data });
    } catch ({ name, message }) {
      res.status(500).send({
        err: { status: 500, name, message },
      });
    }
  });

  app.get('/api/expense-groups/:id?', async (req, res) => {
    try {
      const { id } = req.params;
      const data = id
        ? await ExpenseGroup.findById(id)
        : await ExpenseGroup.find({}).sort({ startDate: -1 });
      res.status(200).send({ data });
    } catch ({ name, message }) {
      res.status(500).send({
        err: { status: 500, name, message },
      });
    }
  });

  app.post('/api/expense-groups', async (req, res) => {
    try {
      const {
        body: { startDate, endDate, ...rest },
      } = req;

      const expenseGroup = await new ExpenseGroup({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        ...rest,
      }).save();

      res.status(201).send({ expenseGroup });
    } catch ({ name, message }) {
      res.status(500).send({
        err: { status: 500, name, message },
      });
    }
  });

  app.put('/api/expense-groups/:groupId', async (req, res) => {
    try {
      const { groupId } = req.params;
      const {
        body: { expenseId, name, value, checked },
      } = req;

      const expenseGroup = await ExpenseGroup.findById(groupId);
      const expense = await expenseGroup.expenses.id(expenseId);

      expense[name] = name === 'isPaid' ? checked : value;

      await expenseGroup.save();

      res.send({ updateId: expenseId });
    } catch ({ name, message }) {
      res.status(500).send({
        err: { status: 500, name, message },
      });
    }
  });

  app.delete('/api/expense-groups/:id', (req, res) => {
    const { id } = req.params;
  });

  app.listen(port, () => {
    console.log('Server running on port:', port);
  });
})();
