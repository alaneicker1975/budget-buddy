import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Hint,
  List,
  ListItem,
  FormField,
  Button,
  CheckOption,
} from '@alaneicker/atomik-ui';
import { toggleNewExpenseForm } from '../../actions';

const ExpenseForm = ({ expenses, isNewExpense, groupId }) => {
  const dispatch = useDispatch();

  const onExpenseUpdate = (e, expenseId) => {
    const { type, name, value, checked } = e.target;

    dispatch({
      type: 'UPDATE_EXPENSE_GROUP',
      data: { groupId, expenseId, type, name, value, checked },
    });
  };

  const validationSchema = yup.object().shape({
    expense: yup.string().required('Expense title is required'),
    balance: yup.number().required('Balance is required'),
  });

  const initialValues = {
    groupId,
    expense: '',
    balance: '',
    isPaid: false,
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      return dispatch({ type: 'INSERT_NEW_EXPENSE', data: { ...values } });
    },
  });

  return (
    <form
      className={classnames('expense-form', {
        'expense-form--is-new-expense': isNewExpense,
      })}
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      {expenses.map(({ _id, expense, balance, isPaid }, i) => {
        return (
          <div className="expense-form__item" key={`expense-item-${i}`}>
            <div className="expense-form__item__status-field">
              <CheckOption
                {...(isNewExpense && { label: 'Is Paid' })}
                name="isPaid"
                checked={isNewExpense ? values.isPaid : isPaid}
                onChange={
                  isNewExpense
                    ? handleChange
                    : (e) => {
                        return onExpenseUpdate(e, _id);
                      }
                }
              />
            </div>
            <div className="expense-form__item__info-fields">
              <div className="expense-form__item__expense-field">
                <FormField
                  className={classnames({
                    'expense-form__item__text-input text-weight-bold': !isNewExpense,
                  })}
                  name="expense"
                  value={isNewExpense ? values.expense : expense}
                  {...(!isNewExpense && {
                    placeholder: 'Expense Title',
                    'aria-label': 'expense title',
                  })}
                  {...(isNewExpense && {
                    label: (
                      <>
                        Expense Title{' '}
                        {errors.expense && touched.expense && (
                          <Hint type="error" className="display-inline">
                            ({errors.expense})
                          </Hint>
                        )}
                      </>
                    ),
                  })}
                  hasError={!!(errors.expense && touched.expense)}
                  onChange={
                    isNewExpense
                      ? handleChange
                      : (e) => {
                          return onExpenseUpdate(e, _id);
                        }
                  }
                />
              </div>
              <div className="expense-form__item__balance-field">
                {!isNewExpense && '$'}
                <FormField
                  className={classnames({
                    'expense-form__item__text-input': !isNewExpense,
                  })}
                  name="balance"
                  type="number"
                  aria-label="balance"
                  {...(!isNewExpense && {
                    placeholder: 'Expense Balance',
                    'aria-label': 'expense balance',
                  })}
                  {...(isNewExpense && {
                    label: (
                      <>
                        Expense Balance{' '}
                        {errors.balance && touched.balance && (
                          <Hint type="error" className="display-inline">
                            ({errors.balance})
                          </Hint>
                        )}
                      </>
                    ),
                  })}
                  value={isNewExpense ? values.balance : balance}
                  hasError={!!(errors.balance && touched.balance)}
                  onChange={
                    isNewExpense
                      ? handleChange
                      : (e) => {
                          return onExpenseUpdate(e, _id);
                        }
                  }
                />
              </div>
            </div>
            {!isNewExpense && (
              <div className="expense-form__item__delete-btn">
                <Button
                  theme="tertiary"
                  size="md"
                  onClick={() => {
                    return dispatch({
                      type: 'DELETE_EXPENSE',
                      groupId,
                      expenseId: _id,
                    });
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
        <List type="horizontal">
          <ListItem>
            <Button type="submit" theme="primary">
              Submit
            </Button>
          </ListItem>
          <ListItem>
            <Button
              onClick={() => {
                return dispatch(toggleNewExpenseForm(false));
              }}
            >
              Cancel
            </Button>
          </ListItem>
        </List>
      )}
    </form>
  );
};

ExpenseForm.propTypes = {
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

ExpenseForm.defaultProps = {
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

export default ExpenseForm;
