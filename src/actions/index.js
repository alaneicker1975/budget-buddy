// Action types
export const REDIRECT = 'REDIRECT';
export const TOGGLE_NEW_EXPENSE_FORM = 'TOGGLE_NEW_EXPENSE_FORM';
export const SET_RECURRING_EXPENSES = 'SET_RECURRING_EXPENSES';
export const SET_EXPENSE_GROUPS = 'SET_EXPENSE_GROUPS';
export const SET_NEW_EXPENSE = 'SET_NEW_EXPENSE';
export const UPDATE_EXPENSE_GROUPS = 'UPDATE_EXPENSE_GROUPS';
export const DELETE_EXPENSE_FROM_EXPENSE_GROUP =
  'DELETE_EXPENSE_FROM_EXPENSE_GROUP';
export const SET_SELECTED_EXPENSE_GROUP = 'SET_SELECTED_EXPENSE_GROUP';
export const SET_NEW_EXPENSE_GROUP = 'SET_NEW_EXPENSE_GROUP';
export const UPDATE_SELECTED_EXPENSE_GROUP = 'UPDATE_SELECTED_EXPENSE_GROUP';

// Action creators
export const redirect = (route) => {
  return { type: REDIRECT, payload: route };
};

export const toggleNewExpenseForm = (toggle) => {
  return { type: TOGGLE_NEW_EXPENSE_FORM, payload: toggle };
};
