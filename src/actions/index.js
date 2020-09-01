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
export const SHOW_CONFIRM_DELETE_DIALOG = 'SHOW_CONFIRM_DELETE_DIALOG';
export const HIDE_CONFIRM_DELETE_DIALOG = 'HIDE_CONFIRM_DELETE_DIALOG';
export const PUSH_MESSAGE = 'PUSH_MESSAGE';
export const PULL_MESSAGE = 'PULL_MESSAGE';
export const RESET_MESSAGES = 'RESET_MESSAGES';

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
  'pushMessage',
  'pullMesssage',
  'resetMessages',
  'toggleNewExpenseForm',
  'setRecurringExpenses',
  'setExpenseGroups',
  'setNewExpense',
  'updateExpenseGroups',
  'removeExpenseGroup',
  'removeExpenseFromExpenseGroup',
  'deleteExpenseGroup',
  'setSelectedExpenseGroup',
  'setNewExpenseGroup',
  'updateSelectedExpenseGroup',
  'showConfirmDeleteDialog',
  'hideConfirmDeleteDialog',
  // Saga watcher actions
  'getExpenseGroups',
  'getExpenseOptions',
  'deleteExpense',
  'updateExpenseGroup',
  'insertNewExpenseGroup',
  'insertNewExpense',
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
