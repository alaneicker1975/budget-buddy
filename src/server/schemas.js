/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenses = mongoose.model(
  'Expenses',
  new Schema({
    expense: String, // The name of the expense
    type: String, // The type of expense
  }),
);

const expenseGroups = mongoose.model(
  'ExpenseGroups',
  new Schema({
    title: String,
    startDate: Date, // When budget period starts
    endDate: Date, // When budget period ends
    budgetAmount: Number, // Budget for period
    budgetEndGoal: Number, // The amount to have left over at the end of a budget period
    expenses: [{ expense: String, balance: Number, isPaid: Boolean }], // Expenses for a budget period
  }),
);

export default {
  expenses,
  expenseGroups,
};
