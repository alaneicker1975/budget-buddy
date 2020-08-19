import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  List,
  ListItem,
  FormField,
  Button,
  CheckOption,
} from '@alaneicker/atomik-ui';

const ExpenseGroupForm = ({ expenses, isNewGroup, groupId }) => {
  const dispatch = useDispatch();

  const [newExpense, setNewExpense] = useState({});

  const onExpenseUpdate = (e, expenseId) => {
    const { type, name, value, checked } = e.target;

    if (isNewGroup) {
      setNewExpense((prevState) => {
        return {
          ...prevState,
          [name]: type === 'checkbox' ? checked : value,
        };
      });
    } else {
      dispatch({
        type: 'UPDATE_EXPENSE_GROUP',
        data: { groupId, expenseId, type, name, value, checked },
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_NEW_EXPENSE', data: newExpense });
  };

  const onExpenseDelete = (_id) => {
    // dispatch action to delete expense from group
  };

  return (
    <form className="expense-group-form" onSubmit={onSubmit} noValidate>
      <List className="expense-group-form__list">
        {expenses.map(({ _id, expense, balance, isPaid }, i) => {
          const paidLabel = isPaid ? 'Paid' : 'Not Paid';
          return (
            <ListItem key={`expense-item-${i}`}>
              <div className="expense-group-form__expense-field">
                <FormField
                  name="expense"
                  value={isNewGroup ? newExpense.expense : expense}
                  placeholder="Expense (E.g. Electric Bill)"
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
              <div className="expense-group-form__balance-field">
                <FormField
                  pattern="^\d*(\.\d{0,2})?$"
                  name="balance"
                  value={isNewGroup ? newExpense.balance : balance.toFixed(2)}
                  placeholder="Balance"
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
              <div className="expense-group-form__status-field">
                <CheckOption
                  name="isPaid"
                  label={paidLabel}
                  checked={isNewGroup ? newExpense.isPaid : isPaid}
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
              {!isNewGroup && (
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
              )}
            </ListItem>
          );
        })}
      </List>
      {isNewGroup && (
        <Button
          type="submit"
          theme="primary"
          className="margin-top-8 margin-bottom-16"
        >
          Submit
        </Button>
      )}
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
  isNewGroup: PropTypes.bool,
  groupId: PropTypes.string,
};

ExpenseGroupForm.defaultProps = {
  expenses: [
    {
      expense: '',
      balance: 0,
      isPaid: false,
    },
  ],
  isNewGroup: false,
  groupId: '',
};

export default ExpenseGroupForm;
