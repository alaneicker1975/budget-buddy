const initialState = {
  selectedExpense: null,
  selectedExpenseId: null,
  expenses: [],
  expenseGroups: [],
  error: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    // Expense Options
    // ----------------------------------------------------
    case 'SET_EXPENSE_OPTIONS':
      return { ...state, expenses: action.data };
    // Expense Groups
    // ----------------------------------------------------
    case 'SET_EXPENSE_GROUPS':
      return { ...state, expenseGroups: action.data };
    case 'UPDATE_EXPENSE_GROUPS':
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.groupId ? state.selectedExpense : group;
        }),
      };
    // Selected Expense
    // ----------------------------------------------------
    case 'SET_SELECTED_EXPENSE':
      return {
        ...state,
        selectedExpenseId: action.id,
        selectedExpense: state.expenseGroups.filter((expense) => {
          return expense._id === action.id;
        })[0],
      };
    case 'UPDATE_SELECTED_EXPENSE':
      return {
        ...state,
        selectedExpense: {
          ...state.selectedExpense,
          expenses: state.selectedExpense.expenses.map((expense) => {
            return expense._id === action.data.expenseId
              ? {
                  ...expense,
                  ...(action.data.type === 'checkbox' && {
                    isPaid: action.data.checked,
                  }),
                  ...(action.data.type === 'text' && {
                    [action.data.name]:
                      action.data.name === 'balance'
                        ? +action.data.value
                        : action.data.value,
                  }),
                }
              : expense;
          }),
        },
      };
    default:
      return state;
  }
};

export default expenseReducer;
