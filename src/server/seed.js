/* eslint-disable import/no-extraneous-dependencies */
const schemas = require('./schemas');

const { Expense, ExpenseGroup } = schemas;

module.exports = {
  async addExpenseGroups() {
    try {
      await ExpenseGroup.insertMany([
        {
          title: 'August 2020',
          startDate: new Date('08/01/2020'),
          endDate: new Date('08/31/2020'),
          budgetAmount: 9000,
          budgetEndGoal: 2000,
          expenses: [
            { expense: 'Mortgage', balance: 1941.65, isPaid: false },
            { expense: 'Day Care', balance: 880.0, isPaid: false },
            { expense: 'Jeep Car Payment', balance: 359.15, isPaid: false },
            { expense: 'Groceries', balance: 400.0, isPaid: false },
          ],
        },
        {
          title: 'September 2020',
          startDate: new Date('08/01/2020'),
          endDate: new Date('08/31/2020'),
          budgetAmount: 9000,
          budgetEndGoal: 2000,
          expenses: [
            { expense: 'Mortgage', balance: 1941.65, isPaid: false },
            { expense: 'Day Care', balance: 880.0, isPaid: false },
            { expense: 'Jeep Car Payment', balance: 359.15, isPaid: false },
            { expense: 'Groceries', balance: 400.0, isPaid: false },
          ],
        },
      ]);

      console.log('Expense group successfully added!');
    } catch (err) {
      console.log(err);
    }
  },
};
