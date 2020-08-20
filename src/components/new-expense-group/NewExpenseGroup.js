import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  FormField,
  DatePicker,
  CheckOption,
  List,
  ListItem,
} from '@alaneicker/atomik-ui';

const NewExpenseGroup = () => {
  const dispatch = useDispatch();

  const [expenseInfo, setExpenseInfo] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [step, setStep] = useState(1);

  const onExpenseOptionSelect = (expense) => {
    setExpenses((prevState) => {
      const index = expenses.indexOf(expense) !== -1;

      if (index) {
        return prevState.filter((item) => {
          return item !== expense;
        });
      }

      return [...prevState, expense];
    });
  };

  const onExpenseInfoChange = (nextState) => {
    setExpenseInfo((prevState) => {
      return {
        ...prevState,
        ...nextState,
      };
    });
  };

  const {
    expenses: { expenseOptions },
    modals: { showExpenseGroupFormModal },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_OPTIONS' });
  }, []);

  return (
    <form>
      <h1 className="margin-bottom-24 text-weight-semibold text-size-30">
        New Expense Group
      </h1>

      <div className="margin-bottom-28">
        <hr />
      </div>

      <Grid>
        <Row>
          <Col md={6}>
            <h3 className="margin-bottom-16 text-weight-semibold text-size-20">
              Expense Info
            </h3>
            <List loose>
              <ListItem>
                <FormField
                  label="Expense Name"
                  value={expenseInfo.expense}
                  onChange={(e) => {
                    return onExpenseInfoChange({ expense: e.target.value });
                  }}
                />
              </ListItem>
              <ListItem>
                <FormField
                  type="number"
                  label="Budget Amount"
                  value={expenseInfo.budgetAmount}
                  onChange={(e) => {
                    return onExpenseInfoChange({
                      budgetAmount: e.target.value,
                    });
                  }}
                />
              </ListItem>
              <ListItem>
                <DatePicker
                  label="Start Date"
                  helpText="Expected Format: MM/DD/YYYY"
                  value={expenseInfo.startDate}
                  onChange={(date) => {
                    return onExpenseInfoChange({ startDate: date });
                  }}
                />
              </ListItem>
              <ListItem>
                <DatePicker
                  label="End Date"
                  helpText="Expected Format: MM/DD/YYYY"
                  value={expenseInfo.endDate}
                  onChange={(date) => {
                    return onExpenseInfoChange({ endDate: date });
                  }}
                />
              </ListItem>
            </List>
          </Col>
          <Col md={1}></Col>
          <Col md={5}>
            <h3 className="margin-bottom-16 margin-top-30 margin-top-collapse@medium text-weight-semibold text-size-20">
              Select Expenses
            </h3>

            <Grid>
              <Row>
                {expenseOptions.map(({ expense }, i) => {
                  return (
                    <Col
                      key={`expense-${i}`}
                      md={6}
                      className="margin-bottom-8"
                    >
                      <CheckOption
                        label={expense}
                        checked={expenses.includes(expense)}
                        onChange={() => {
                          return onExpenseOptionSelect(expense);
                        }}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Grid>
          </Col>
        </Row>
      </Grid>

      <div className="margin-top-32">
        <hr />
      </div>

      <Button
        className="margin-top-24"
        type="submit"
        theme="primary"
        onClick={() => {
          return setStep(3);
        }}
      >
        Create Expense Group
      </Button>
    </form>
  );
};

export default NewExpenseGroup;
