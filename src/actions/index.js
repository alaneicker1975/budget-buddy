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
export const DELETE_EXPENSE_FROM_EXPENSE_GROUP =
  'DELETE_EXPENSE_FROM_EXPENSE_GROUP';

// Saga action types
export const FETCH_EXPENSE_OPTIONS = 'FETCH_EXPENSE_OPTIONS';
export const FETCH_EXPENSE_GROUPS = 'FETCH_EXPENSE_GROUPS';
export const INSERT_NEW_EXPENSE = 'INSERT_NEW_EXPENSE';
export const INSERT_NEW_EXPENSE_GROUP = 'INSERT_NEW_EXPENSE_GROUP';
export const UPDATE_EXPENSE_GROUP = 'UPDATE_EXPENSE_GROUP';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

// Action creators
const actionCreators = {};

// Generate action creators
[
  // Reducer Actions
  'redirect',
  'toggleNewExpenseForm',
  'setRecurringExpenses',
  'setExpenseGroups',
  'setNewExpense',
  'updateExpenseGroups',
  'deleteExpenseFromExpenseGroup',
  'setSelectedExpenseGroup',
  'setNewExpenseGroup',
  'updateSelectedExpenseGroup',
  // Saga watcher actions
  'deleteExpense',
].forEach((action) => {
  const actionName = action.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
  actionCreators[action] = (payload) => {
    return {
      type: actionName,
      payload,
    };
  };
});

export default actionCreators;

// Action creators
// export const redirect = (route) => {
//   return { type: REDIRECT, payload: route };
// };

// export const toggleNewExpenseForm = (toggle) => {
//   return { type: TOGGLE_NEW_EXPENSE_FORM, payload: toggle };
// };

// export const setRecurringExpenses = (payload) => {
//   return { type: SET_RECURRING_EXPENSES, payload };
// };
