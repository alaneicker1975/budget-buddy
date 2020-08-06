/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const ExpensesSchema = new Schema({
  expense: String,
});

export const expenses = mongoose.model('Expenses', ExpensesSchema);
