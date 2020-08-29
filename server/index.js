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

  app.get('/api/expense-groups/:groupId?', async (req, res) => {
    try {
      const { groupId } = req.params;
      const data = groupId
        ? await ExpenseGroup.findById(groupId)
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

  app.post('/api/expense-groups/:groupId', async (req, res) => {
    try {
      const { groupId } = req.params;
      const { body } = req;

      const expenseGroup = await ExpenseGroup.findById(groupId);

      expenseGroup.expenses = [body, ...expenseGroup.expenses];

      await expenseGroup.save();

      const expense = expenseGroup.expenses[0];

      res.send({ expense });
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

      res.send({ expenseGroup });
    } catch ({ name, message }) {
      res.status(500).send({
        err: { status: 500, name, message },
      });
    }
  });

  app.delete('/api/expense-groups/:groupId/:expenseId?', async (req, res) => {
    try {
      const { groupId, expenseId } = req.params;

      if (expenseId) {
        const expenseGroup = await ExpenseGroup.findById(groupId);
        expenseGroup.expenses = expenseGroup.expenses.filter((expense) => {
          return String(expense._id) !== expenseId;
        });
        await expenseGroup.save();
      } else {
        const expenseGroup = await ExpenseGroup.findByIdAndRemove(groupId);
        await expenseGroup.save();
      }

      res.send({});
    } catch ({ name, message }) {
      res.status(500).send({
        err: { status: 500, name, message },
      });
    }
  });

  app.listen(port, () => {
    console.log('Server running on port:', port);
  });
})();
