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

const ExpenseGroupForm = ({ expenses, isNewExpense, groupId }) => {
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
    <form
      className={classnames('expense-group-form', {
        'expense-group-form--is-new-expense': isNewExpense,
      })}
      onSubmit={onSubmit}
      noValidate
    >
      {expenses.map(({ _id, expense, balance, isPaid }, i) => {
        return (
          <div className="expense-group-form__item" key={`expense-item-${i}`}>
            <div className="expense-group-form__item__status-field">
              <CheckOption
                {...(isNewExpense && { label: 'Is Paid' })}
                name="isPaid"
                checked={isNewExpense ? newExpense.isPaid : isPaid}
                onChange={(e) => {
                  return onExpenseUpdate(e, _id);
                }}
              />
            </div>
            <div className="expense-group-form__item__info-fields">
              <div className="expense-group-form__item__expense-field">
                <FormField
                  className={classnames({
                    'expense-group-form__item__text-input text-weight-bold': !isNewExpense,
                  })}
                  name="expense"
                  value={isNewExpense ? newExpense.expense : expense}
                  {...{
                    [isNewExpense ? 'label' : 'placeholder']: 'Expense Title',
                  }}
                  aria-label="expense title"
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
              <div className="expense-group-form__item__balance-field">
                {!isNewExpense && '$'}
                <FormField
                  className={classnames({
                    'expense-group-form__item__text-input': !isNewExpense,
                  })}
                  name="balance"
                  type="number"
                  {...{ [isNewExpense ? 'label' : 'placeholder']: 'Balance' }}
                  value={isNewExpense ? newExpense.balance : balance}
                  aria-label="balance"
                  onChange={(e) => {
                    return onExpenseUpdate(e, _id);
                  }}
                />
              </div>
            </div>
            {!isNewExpense && (
              <div className="expense-group-form__item__delete-btn">
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
          </div>
        );
      })}
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
};

ExpenseGroupForm.defaultProps = {
  expenses: [
    {
      expense: '',
      balance: '',
      isPaid: false,
    },
  ],
  isNewExpense: false,
  groupId: '',
};

export default ExpenseGroupForm;
