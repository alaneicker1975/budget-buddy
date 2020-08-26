const initialState = {
  selectedExpense: null,
  selectedExpenseId: null,
  showNewExpenseForm: false,
  recurringExpenses: [],
  expenseGroups: [],
  redirectTo: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REDIRECT':
      return { ...state, redirectTo: action.redirectTo };
    // Toggles the new expense form
    case 'TOGGLE_NEW_EXPENSE_FORM':
      return {
        ...state,
        showNewExpenseForm: action.showNewExpenseForm,
      };
    // Sets expense options
    case 'SET_RECURRING_EXPENSES':
      return { ...state, recurringExpenses: action.data };
    // Sets expense groups
    case 'SET_EXPENSE_GROUPS':
      return { ...state, expenseGroups: action.data };
    // Adds the new expense to the expense group
    case 'SET_NEW_EXPENSE':
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.groupId
            ? { ...group, expenses: [action.expense, ...group.expenses] }
            : group;
        }),
      };
    // Updates expenseGroups array with updates expense object
    case 'UPDATE_EXPENSE_GROUPS':
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.groupId ? state.selectedExpense : group;
        }),
      };
    // Deletes an expense from an expense group
    case 'DELETE_EXPENSE_FROM_EXPENSE_GROUP':
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.groupId
            ? {
                ...group,
                expenses: group.expenses.filter((expense) => {
                  return expense._id !== action.expenseId;
                }),
              }
            : group;
        }),
      };
    // Sets the selected expense group based on _id
    case 'SET_SELECTED_EXPENSE_GROUP':
      return {
        ...state,
        selectedExpenseId: action.groupId,
        selectedExpense: state.expenseGroups.filter((expense) => {
          return expense._id === action.groupId;
        })[0],
      };
    // Updates expenseGroups array with new expense object
    case 'SET_NEW_EXPENSE_GROUP':
      return {
        ...state,
        expenseGroups: [...state.expenseGroups, action.expenseGroup],
      };
    // Updates the selected expense group after update
    case 'UPDATE_SELECTED_EXPENSE_GROUP':
      return {
        ...state,
        selectedExpense: action.expenseGroup,
      };
    default:
      return state;
  }
};

export default expenseReducer;
