import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Modal, CheckOption } from '@alaneicker/atomik-ui';

const NewExpenseGroupModal = () => {
  const dispatch = useDispatch();

  const [expenseGroup, setExpenseGroup] = useState([]);

  const setExpense = (expense) => {};

  const {
    expenses: { expenses },
    modals: { showExpenseGroupFormModal },
  } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_OPTIONS' });
  }, []);

  return (
    <Modal
      disableEscapKey
      disableOverlayclick
      onClose={() => {
        dispatch({ type: 'TOGGLE_EXPENSE_GROUP_FORM_MODAL' });
      }}
      title="Add New Expense Group"
      isOpen={showExpenseGroupFormModal}
    >
      <Grid>
        <Row>
          {expenses.map(({ _id, expense }, i) => {
            return (
              <Col key={`expense-${i}`} md={4} className="margin-bottom-8">
                <CheckOption label={expense} />
              </Col>
            );
          })}
        </Row>
      </Grid>
    </Modal>
  );
};

export default NewExpenseGroupModal;
