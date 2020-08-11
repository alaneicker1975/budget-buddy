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

  // async function addExpenseGroups() {
  //   try {
  //     await ExpenseGroup.insertMany([
  //       {
  //         title: 'August 2020',
  //         startDate: new Date('08/01/2020'),
  //         endDate: new Date('08/31/2020'),
  //         budgetAmount: 9000,
  //         budgetEndGoal: 2000,
  //         expenses: [
  //           { expense: 'Mortgage', balance: 1941.65, isPaid: false },
  //           { expense: 'Day Care', balance: 880.0, isPaid: false },
  //           { expense: 'Jeep Car Payment', balance: 359.15, isPaid: false },
  //           { expense: 'Groceries', balance: 400.0, isPaid: false },
  //         ],
  //       },
  //       {
  //         title: 'September 2020',
  //         startDate: new Date('09/01/2020'),
  //         endDate: new Date('09/31/2020'),
  //         budgetAmount: 9000,
  //         budgetEndGoal: 2000,
  //         expenses: [
  //           { expense: 'Mortgage', balance: 1941.65, isPaid: false },
  //           { expense: 'Day Care', balance: 880.0, isPaid: false },
  //           { expense: 'Jeep Car Payment', balance: 359.15, isPaid: false },
  //           { expense: 'Groceries', balance: 400.0, isPaid: false },
  //         ],
  //       },
  //     ]);

  //     console.log('Expense group successfully added!');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // addExpenseGroups();

  app.use(bodyParser.json());
  app.use(compression());
  app.use(cors());

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Connected to database');
  });

  app.get('/api/expenses/:id?', async (req, res) => {
    try {
      const { id } = req.params;
      const data = id ? await Expense.findById(id) : await Expense.find({});
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
        : await ExpenseGroup.find({}, [], { sort: { startDate: -1 } });
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

      res.status(201).send({ insertId: expenseGroup._id });
    } catch ({ name, message }) {
      res.status(500).send({
        err: { status: 500, name, message },
      });
    }
  });

  app.put('/api/expense-groups/:id', (req, res) => {
    const { id } = req.params;
  });

  app.delete('/api/expense-groups/:id', (req, res) => {
    const { id } = req.params;
  });

  app.listen(port, () => {
    console.log('Server running on port:', port);
  });
})();
