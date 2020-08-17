import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Statistic, Modal, Button } from '@alaneicker/atomik-ui';
import ExpenseGroupForm from '../expense-group-form';
import BudgetVisualizationChart from '../budget-visualization-chart';

const ExpenseGroupDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE', id });
  }, [id]);

  const {
    expenses: { selectedExpense },
  } = useSelector((state) => {
    return state;
  });

  if (selectedExpense) {
    const {
      _id,
      budgetAmount,
      expenses,
      title,
      startDate,
      endDate,
    } = selectedExpense;

    const totalBalance = expenses.reduce((a, b) => {
      return a + b.balance;
    }, 0);

    const unpaidBalance = expenses.reduce((a, b) => {
      return !b.isPaid ? a + b.balance : a;
    }, 0);

    const remainingBalnace = budgetAmount - totalBalance;

    return (
      <div className="expense-group-detail">
        <div className="expense-group-detail__hd">
          <div className="text-align-center text-align-left@medium">
            <Statistic
              value={title}
              label={`${moment(startDate).format('L')} - ${moment(
                endDate,
              ).format('L')}`}
              topLabel
            />
          </div>
          <div className="text-align-center text-align-right@medium">
            <span className="text-size-20@medium">
              <Statistic
                value={`$${budgetAmount.toLocaleString('en', {
                  minimumFractionDigits: 2,
                })}`}
                label="Budget Amount"
                theme="green"
                size="md"
                topLabel
              />
            </span>
          </div>
        </div>
        <div className="expense-group-detail__bd">
          <div>
            <div className="flex flex--align-middle flex--space-between">
              <h3 className="text-size-20@medium text-weight-bold">Expenses</h3>
              <Button
                theme="link"
                size="md"
                onClick={() => {
                  return setShowAddModal(true);
                }}
              >
                <span className="text-weight-semibold">+ Add Expense</span>
              </Button>
            </div>
            <hr />
            <ExpenseGroupForm expenses={expenses} />
            <hr />
            <h4 className="text-size-20@medium text-weight-medium">
              Unpaid Balance:{' '}
              <span className="text-color-red-100">
                $
                {unpaidBalance.toLocaleString('en', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </h4>
          </div>
          <div>
            <div className="margin-top-32 margin-collapse@medium" />
            <BudgetVisualizationChart
              expenses={expenses}
              totalBalance={totalBalance}
            />
            <h4 className="margin-top-16 margin-bottom-8 text-weight-bold">
              End of Month Projection
            </h4>
            <p>
              Base on your current budget of $
              {budgetAmount.toLocaleString('en', { minimumFractionDigits: 2 })}{' '}
              and a total balance of $
              {totalBalance.toLocaleString('en', { minimumFractionDigits: 2 })}{' '}
              in expenses due, you should have a remaning balance of $
              {remainingBalnace.toLocaleString('en', {
                minimumFractionDigits: 2,
              })}{' '}
              on {moment(endDate).format('L')}.
            </p>
          </div>
        </div>
        <Modal
          disableEscapKey
          disableOverlayclick
          isOpen={showAddModal}
          onClose={() => {
            return setShowAddModal(false);
          }}
          title="Add New Expense"
        >
          <ExpenseGroupForm isNewGroup />
        </Modal>
      </div>
    );
  }
  return <div>No expenses to display.</div>;
};

export default ExpenseGroupDetail;
