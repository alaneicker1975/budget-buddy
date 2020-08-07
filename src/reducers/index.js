const initialState = {
  expenses: [],
  expenseGroups: [],
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_EXPENSES':
      return { ...state, expenses: action.data };
    case 'FETCH_EXPENSE_GROUP_SUCCESS':
      return { ...state, expenseGroups: action.data };
    case 'FETCH_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default rootReducer;
