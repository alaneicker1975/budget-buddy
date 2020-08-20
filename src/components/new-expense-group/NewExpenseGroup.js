import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mongoose from 'mongoose';
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

  const validationSchema = yup.object().shape({
    expenseGroupTitle: yup.string().required('Expense group title is required'),
    startDate: yup.string().required('Start Date is required'),
    endDate: yup.string().required('End date is required'),
    budgetAmount: yup.number().required('Budget Amount is required'),
    expenses: yup.array().min(1).required('At least one expense is required'),
  });

  const initialValues = {
    expenseGroupTitle: '',
    startDate: '',
    endDate: '',
    budgetAmount: '',
    expenses: [],
  };

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      return onSubmit(values);
    },
  });

  const onExpenseOptionSelect = (expense) => {
    const { expenses } = values;
    const index = expenses.indexOf(expense) !== -1;

    const updatedExpenses = index
      ? expenses.filter((item) => {
          return item !== expense;
        })
      : [...expenses, expense];

    setFieldValue('expenses', updatedExpenses);
  };

  const {
    expenses: { expenseOptions },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_EXPENSE', id: null });
    dispatch({ type: 'FETCH_EXPENSE_OPTIONS' });
  }, []);

  return (
    <form onSubmit={handleSubmit} noValidate>
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
                  name="expenseGroupTitle"
                  label="Expense Group Title"
                  value={values.expenseGroupTitle}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <FormField
                  name="budgetAmount"
                  type="number"
                  label="Budget Amount"
                  value={values.budgetAmount}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <DatePicker
                  name="startDate"
                  label="Start Date"
                  helpText="Expected Format: MM/DD/YYYY"
                  value={values.startDate}
                  onChange={(date) => {
                    return setFieldValue('startDate', date);
                  }}
                />
              </ListItem>
              <ListItem>
                <DatePicker
                  name="endDate"
                  label="End Date"
                  helpText="Expected Format: MM/DD/YYYY"
                  value={values.endDate}
                  onChange={(date) => {
                    return setFieldValue('endDate', date);
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
                      className="margin-bottom-16"
                    >
                      <CheckOption
                        label={expense}
                        checked={values.expenses.includes(expense)}
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

      <Button className="margin-top-24" type="submit" theme="primary">
        Create Expense Group
      </Button>
    </form>
  );
};

export default NewExpenseGroup;
