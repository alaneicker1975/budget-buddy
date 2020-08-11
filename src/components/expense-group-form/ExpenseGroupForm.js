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
  return (
    <form className="expense-group-form">
      <List className="expense-group-form__list">
        {expenses.map(({ expense, balance, isPaid }) => {
          return (
            <ListItem key={shortid.generate()}>
              <div>
                <FormField value={expense} placeholder="Expense" />
              </div>
              <div>
                <FormField value={balance.toFixed(2)} placeholder="Balance" />
              </div>
              <div>
                <CheckOption
                  label={isPaid ? 'Paid' : 'Not Paid'}
                  checked={isPaid}
                  name="isPaidCheckbox"
                  onChange={() => {}}
                />
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
