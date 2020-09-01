import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Hint,
  FormField,
  DatePicker,
  CheckOption,
  List,
  ListItem,
} from '@alaneicker/atomik-ui';
import actionCreators from '../../actions';

const {
  setSelectedExpenseGroup,
  insertNewExpenseGroup,
  getExpenseOptions,
} = actionCreators;

const NewExpenseGroup = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    title: yup.string().required('Expense group title is required'),
    startDate: yup.string().required('Start Date is required'),
    endDate: yup.string().required('End date is required'),
    budgetAmount: yup.number().required('Budget Amount is required'),
    expenses: yup.array().min(1, 'At least one expense is required').required(),
  });

  const initialValues = {
    title: '',
    startDate: '',
    endDate: '',
    budgetAmount: '',
    expenses: [],
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
      return dispatch(insertNewExpenseGroup({ ...values }));
    },
  });

  const checkIfExpenseIsSelected = (expense) => {
    return !!values.expenses.find((exp) => {
      return exp.expense === expense;
    });
  };

  const onExpenseOptionSelect = (expense) => {
    const { expenses } = values;
    const exists = checkIfExpenseIsSelected(expense);

    const updatedExpenses = exists
      ? expenses.filter((exp) => {
          return exp.expense !== expense;
        })
      : [
          ...expenses,
          {
            balance: '',
            isPaid: false,
            expense,
          },
        ];

    setFieldValue('expenses', updatedExpenses);
  };

  const {
    expenses: { recurringExpenses },
    app: { redirectTo },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch(setSelectedExpenseGroup({ groupId: null }));
    dispatch(getExpenseOptions());
  }, []);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
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
                  name="title"
                  label="Expense Group Title"
                  value={values.title}
                  onChange={handleChange}
                  hasError={!!(errors.title && touched.title)}
                  errorText={errors.title}
                />
              </ListItem>
              <ListItem>
                <DatePicker
                  name="startDate"
                  label="Start Date"
                  helpText="Expected Format: MM/DD/YYYY"
                  value={values.startDate}
                  hasError={!!(errors.startDate && touched.startDate)}
                  errorText={errors.startDate}
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
                  hasError={!!(errors.endDate && touched.endDate)}
                  errorText={errors.endDate}
                  onChange={(date) => {
                    return setFieldValue('endDate', date);
                  }}
                />
              </ListItem>
              <ListItem>
                <FormField
                  name="budgetAmount"
                  type="number"
                  label="Budget Amount"
                  value={values.budgetAmount}
                  onChange={handleChange}
                  hasError={!!(errors.budgetAmount && touched.budgetAmount)}
                  errorText={errors.budgetAmount}
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
                {recurringExpenses.map(({ expense }, i) => {
                  return (
                    <Col
                      key={`expense-${i}`}
                      md={6}
                      className="margin-bottom-16"
                    >
                      <CheckOption
                        label={expense}
                        checked={checkIfExpenseIsSelected(expense)}
                        hasError={!!(errors.expenses && touched.expenses)}
                        onChange={() => {
                          return onExpenseOptionSelect(expense);
                        }}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Grid>
            {errors.expenses && touched.expenses && (
              <Hint type="error">{errors.expenses}</Hint>
            )}
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
