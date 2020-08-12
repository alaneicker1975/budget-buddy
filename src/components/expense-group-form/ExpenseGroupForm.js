import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  FormField,
  Button,
  CheckOption,
} from '@alaneicker/atomik-ui';

const ExpenseGroupForm = ({ expenses }) => {
  const onExpenseDelete = (_id) => {
    // dispatch action to delete expense from group
  };

  return (
    <form className="expense-group-form">
      <List className="expense-group-form__list">
        {expenses.map(({ _id, expense, balance, isPaid }) => {
          return (
            <ListItem key={shortid.generate()}>
              <div className="expense-group-form__expense-field">
                <FormField value={expense} placeholder="Expense" />
              </div>
              <div className="expense-group-form__balance-field">
                <FormField value={balance.toFixed(2)} placeholder="Balance" />
              </div>
              <div className="expense-group-form__status-field">
                <CheckOption
                  label={isPaid ? 'Paid' : 'Not Paid'}
                  checked={isPaid}
                  name="isPaidCheckbox"
                  onChange={() => {}}
                />
              </div>
              <div className="expense-group-form__delete-btn">
                <Button
                  theme="tertiary"
                  size="md"
                  onClick={() => {
                    return onExpenseDelete(_id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </ListItem>
          );
        })}
      </List>
    </form>
  );
};

ExpenseGroupForm.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      expense: PropTypes.string,
      balance: PropTypes.number,
      isPaid: PropTypes.bool,
    }),
  ),
};

ExpenseGroupForm.defaultProps = {
  expenses: [],
};

export default ExpenseGroupForm;
