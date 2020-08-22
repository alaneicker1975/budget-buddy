import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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

const ExpenseGroupForm = ({
  expenses,
  isNewExpense,
  groupId,
  isExpenseGroupDetail,
}) => {
  const dispatch = useDispatch();

  const [newExpense, setNewExpense] = useState({});

  const onExpenseUpdate = (e, expenseId) => {
    const { type, name, value, checked } = e.target;

    if (isNewExpense) {
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
                  className={classnames({
                    'expense-group-form__text-input': isExpenseGroupDetail,
                  })}
                  name="expense"
                  value={isNewExpense ? newExpense.expense : expense}
                  placeholder="Expense (E.g. Electric Bill)"
                  aria-label="expense title"
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
              <div className="expense-group-form__balance-field">
                <FormField
                  className={classnames({
                    'expense-group-form__text-input': isExpenseGroupDetail,
                  })}
                  name="balance"
                  type="number"
                  value={isNewExpense ? newExpense.balance : balance}
                  placeholder="Balance"
                  aria-label="balance"
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
              <div className="expense-group-form__status-field">
                <CheckOption
                  name="isPaid"
                  label={paidLabel}
                  checked={isNewExpense ? newExpense.isPaid : isPaid}
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
              {!isNewExpense && (
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
      {isNewExpense && (
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
      balance: PropTypes.string,
      isPaid: PropTypes.bool,
    }),
  ),
  isNewExpense: PropTypes.bool,
  groupId: PropTypes.string,
  isExpenseGroupDetail: PropTypes.bool,
};

ExpenseGroupForm.defaultProps = {
  expenses: [
    {
      expense: '',
      balance: '0',
      isPaid: false,
    },
  ],
  isNewExpense: false,
  groupId: '',
  isExpenseGroupDetail: false,
};

export default ExpenseGroupForm;
