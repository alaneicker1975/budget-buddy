import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
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

  const [expenseGroups, setExpenseGroups] = useState([]);

  const onExpenseUpdate = (e, expenseId) => {
    const { type, name, value, checked } = e.target;

    dispatch({
      type: 'UPDATE_EXPENSE_GROUP',
      data: { groupId, expenseId, type, name, value, checked },
    });
  };

  const onExpenseDelete = (_id) => {
    // dispatch action to delete expense from group
  };

  useEffect(() => {
    setExpenseGroups(expenses);
  }, [expenses]);

  return (
    <form className="expense-group-form">
      <List className="expense-group-form__list">
        {expenseGroups.map(({ _id, expense, balance, isPaid }) => {
          const paidLabel = isPaid ? 'Paid' : 'Not Paid';
          return (
            <ListItem key={shortid.generate()}>
              <div className="expense-group-form__expense-field">
                <FormField
                  name="expense"
                  value={expense}
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
                  value={balance.toFixed(2)}
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
                  checked={isPaid}
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
      <>
        {isNewGroup && (
          <div>
            <Button
              theme="link"
              onClick={() => {
                return setExpenseGroups((prevState) => {
                  return [
                    ...prevState,
                    {
                      expense: '',
                      balance: 0,
                      isPaid: false,
                    },
                  ];
                });
              }}
            >
              + Add Expense
            </Button>
          </div>
        )}
        {isNewGroup && (
          <Button theme="primary" className="margin-top-8 margin-bottom-16">
            Submit
          </Button>
        )}
      </>
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
