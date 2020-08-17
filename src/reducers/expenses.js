const initialState = {
  selectedExpense: null,
  selectedExpenseId: null,
  expenses: [],
  expenseGroups: [],
  error: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_EXPENSE':
      return {
        ...state,
        selectedExpenseId: action.id,
        selectedExpense: state.expenseGroups.filter((expense) => {
          return expense._id === action.id;
        })[0],
      };
    case 'FETCH_EXPENSES':
      return { ...state, expenses: action.data };
    case 'FETCH_EXPENSE_GROUP_SUCCESS':
      return { ...state, expenseGroups: action.data };
    case 'UPDATE_EXPENSE_GROUP_SUCCESS':
      return {
        ...state,
        expenses: state.expenses.map((group) => {
          return action.data.id === group._id
            ? {
                ...group,
                ...(action.data.type === 'checkbox' && {
                  isPaid: action.data.checked,
                }),
                ...(action.data.type === 'text' && {
                  [action.data.name]: action.data.value,
                }),
              }
            : group;
        }),
      };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default expenseReducer;
