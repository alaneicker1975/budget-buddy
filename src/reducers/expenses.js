const initialState = {
  selectedExpense: null,
  selectedExpenseId: null,
  expenseOptions: [],
  expenseGroups: [],
  error: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    // Sets expense options
    case 'SET_EXPENSE_OPTIONS':
      return { ...state, expenseOptions: action.data };
    // Sets expense groups
    case 'SET_EXPENSE_GROUPS':
      return { ...state, expenseGroups: action.data };
    // Updates expenseGroups array with updates expense object
    case 'UPDATE_EXPENSE_GROUPS':
      return {
        ...state,
        expenseGroups: state.expenseGroups.map((group) => {
          return group._id === action.groupId ? state.selectedExpense : group;
        }),
      };
    // Sets the selected expense group based on _id
    case 'SET_SELECTED_EXPENSE_GROUP':
      return {
        ...state,
        selectedExpenseId: action.id,
        selectedExpense: state.expenseGroups.filter((expense) => {
          return expense._id === action.id;
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
