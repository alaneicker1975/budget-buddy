const mongoose = require('mongoose');

const { Schema } = mongoose;

const Expense = mongoose.model(
  'Expenses',
  new Schema({
    expense: String, // The name of the expense
    type: String, // The type of expense
  }),
);

const ExpenseGroup = mongoose.model(
  'ExpenseGroups',
  new Schema({
    title: String,
    startDate: String, // When budget period starts
    endDate: String, // When budget period ends
    budgetAmount: Number, // Budget for period
    budgetEndGoal: Number, // The amount to have left over at the end of a budget period
    expenses: [{ expense: String, balance: String, isPaid: Boolean }], // Expenses for a budget period
  }),
);

module.exports = {
  Expense,
  ExpenseGroup,
};
