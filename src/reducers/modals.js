const initialState = {
  showExpenseFormModal: false,
  showExpenseGroupFormModal: false,
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EXPENSE_FORM_MODAL':
      return { ...state, showExpenseFormModal: !state.showExpenseFormModal };
    case 'TOGGLE_EXPENSE_GROUP_FORM_MODAL':
      return {
        ...state,
        showExpenseGroupFormModal: !state.showExpenseGroupFormModal,
      };
    default:
      return state;
  }
};

export default modalsReducer;
