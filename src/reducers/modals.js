const initialState = {
  showExpenseFormModal: false,
  showExpenseGroupFormModal: false,
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EXPENSE_FORM_MODAL':
      return { ...state, showExpenseFormModal: !state.showExpenseFormModal };
    default:
      return state;
  }
};

export default modalsReducer;
