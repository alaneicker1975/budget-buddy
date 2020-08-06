/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import { Date } from 'core-js';

const { Schema } = mongoose;

const ExpensesSchema = new Schema({
  expense: String,
});

const ExpenseGroupsSchema = new Schema({
  startDate: Date,
  endDate: Date,
  budgetAmount: Number,
  budgetEndGoal: Number,
  expenses: [{ expense: String, balance: Number, isPaid: Boolean }],
});

export default {
  expenses: mongoose.model('Expenses', ExpensesSchema),
  expenseGroups: mongoose.model('ExpenseGroups', ExpenseGroupsSchema),
};
