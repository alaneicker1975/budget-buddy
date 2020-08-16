import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  List,
  ListItem,
  FormField,
  Button,
  CheckOption,
} from '@alaneicker/atomik-ui';

const ExpenseGroupForm = ({ expenses, isNewGroup }) => {
  const [expenseGroups, setExpenseGroups] = useState([]);

  const onExpenseDelete = (_id) => {
    // dispatch action to delete expense from group
  };

  useEffect(() => {
    setExpenseGroups(expenses);
  }, [expenses]);

  return (
    <form className="expense-group-form">
      <List className="expense-group-form__list">
        {expenseGroups
          .sort((a, b) => {
            return b.balance - a.balance;
          })
          .map(({ _id, expense, balance, isPaid }) => {
            const paidLabel = isPaid ? 'Paid' : 'Not Paid';
            return (
              <ListItem key={shortid.generate()}>
                <div className="expense-group-form__expense-field">
                  <FormField
                    value={expense}
                    placeholder="Expense (E.g. Electric Bill)"
                  />
                </div>
                <div className="expense-group-form__balance-field">
                  <FormField value={balance.toFixed(2)} placeholder="Balance" />
                </div>
                <div className="expense-group-form__status-field">
                  <CheckOption
                    label={paidLabel}
                    checked={isPaid}
                    name="isPaidCheckbox"
                    onChange={() => {}}
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
};

export default ExpenseGroupForm;
