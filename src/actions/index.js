// Reducer Action types
export const REDIRECT = 'REDIRECT';
export const TOGGLE_NEW_EXPENSE_FORM = 'TOGGLE_NEW_EXPENSE_FORM';
export const SET_RECURRING_EXPENSES = 'SET_RECURRING_EXPENSES';
export const SET_EXPENSE_GROUPS = 'SET_EXPENSE_GROUPS';
export const SET_NEW_EXPENSE = 'SET_NEW_EXPENSE';
export const UPDATE_EXPENSE_GROUPS = 'UPDATE_EXPENSE_GROUPS';
export const SET_SELECTED_EXPENSE_GROUP = 'SET_SELECTED_EXPENSE_GROUP';
export const SET_NEW_EXPENSE_GROUP = 'SET_NEW_EXPENSE_GROUP';
export const UPDATE_SELECTED_EXPENSE_GROUP = 'UPDATE_SELECTED_EXPENSE_GROUP';
export const REMOVE_EXPENSE_FROM_EXPENSE_GROUP =
  'REMOVE_EXPENSE_FROM_EXPENSE_GROUP';
export const REMOVE_EXPENSE_GROUP = 'REMOVE_EXPENSE_GROUP';

// Saga action types
export const GET_EXPENSE_OPTIONS = 'GET_EXPENSE_OPTIONS';
export const GET_EXPENSE_GROUPS = 'GET_EXPENSE_GROUPS';
export const INSERT_NEW_EXPENSE = 'INSERT_NEW_EXPENSE';
export const INSERT_NEW_EXPENSE_GROUP = 'INSERT_NEW_EXPENSE_GROUP';
export const UPDATE_EXPENSE_GROUP = 'UPDATE_EXPENSE_GROUP';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const DELETE_EXPENSE_GROUP = 'DELETE_EXPENSE_GROUP';

// Action creators
const actionCreators = {};

[
  // Reducer actions
  'redirect',
  'toggleNewExpenseForm',
  'setRecurringExpenses',
  'setExpenseGroups',
  'setNewExpense',
  'updateExpenseGroups',
  'removeExpenseFromExpenseGroup',
  'deleteExpenseGroup',
  'setSelectedExpenseGroup',
  'setNewExpenseGroup',
  'updateSelectedExpenseGroup',
  // Saga watcher actions
  'deleteExpense',
].forEach((action) => {
  // converts the function name to the corresponding action type
  const actionType = action.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();

  actionCreators[action] = (payload) => {
    return {
      type: actionType,
      payload,
    };
  };
});

export default actionCreators;
