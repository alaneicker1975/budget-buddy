import {
  TOGGLE_NEW_EXPENSE_FORM,
  SET_RECURRING_EXPENSES,
  SET_EXPENSE_GROUPS,
  SET_NEW_EXPENSE,
  UPDATE_EXPENSE_GROUPS,
  REMOVE_EXPENSE_FROM_EXPENSE_GROUP,
  REMOVE_EXPENSE_GROUP,
  SET_SELECTED_EXPENSE_GROUP,
  SET_NEW_EXPENSE_GROUP,
  UPDATE_SELECTED_EXPENSE_GROUP,
} from '../actions';

const initialState = {
  selectedExpense: null,
  selectedExpenseId: null,
  showNewExpenseForm: false,
  recurringExpenses: [],
  expenseGroups: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    // Toggles the new expense form
    case TOGGLE_NEW_EXPENSE_FORM:
      return {
        ...state,
        showNewExpenseForm: action.payload,
      };
    // Sets expense options
    case SET_RECURRING_EXPENSES:
      return { ...state, recurringExpenses: action.payload };
    // Sets expense groups
    case SET_EXPENSE_GROUPS:
      return { ...state, expenseGroups: action.payload };
    // Adds the new expense to the expense group
    case SET_NEW_EXPENSE:
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.payload.groupId
            ? {
                ...group,
                expenses: [action.payload.expense, ...group.expenses],
              }
            : group;
        }),
      };
    // Updates expenseGroups array with updates expense object
    case UPDATE_EXPENSE_GROUPS:
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.payload.groupId
            ? state.selectedExpense
            : group;
        }),
      };
    // Deletes an expense from an expense group
    case REMOVE_EXPENSE_FROM_EXPENSE_GROUP:
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.payload.groupId
            ? {
                ...group,
                expenses: group.expenses.filter((expense) => {
                  return expense._id !== action.payload.expenseId;
                }),
              }
            : group;
        }),
      };
    // Deletes an expense group
    case REMOVE_EXPENSE_GROUP:
      return {
        ...state,
        expenseGroups: state.expenseGroups.filter((expense) => {
          return expense._id !== action.payload.groupId;
        }),
      };
    // Sets the selected expense group based on _id
    case SET_SELECTED_EXPENSE_GROUP:
      return {
        ...state,
        selectedExpenseId: action.payload.groupId,
        selectedExpense: state.expenseGroups.find((expense) => {
          return expense._id === action.payload.groupId;
        }),
      };
    // Updates expenseGroups array with new expense object
    case SET_NEW_EXPENSE_GROUP:
      return {
        ...state,
        expenseGroups: [...state.expenseGroups, action.payload.expenseGroup],
      };
    // Updates the selected expense group after update
    case UPDATE_SELECTED_EXPENSE_GROUP:
      return {
        ...state,
        selectedExpense: action.payload.expenseGroup,
      };
    default:
      return state;
  }
};

export default expenseReducer;
