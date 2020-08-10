import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { List, ListItem } from '@alaneicker/atomik-ui';

const ExpenseGroupsPreview = () => {
  const dispatch = useDispatch();

  const { expenseGroups, error } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_EXPENSE_GROUPS' });
  }, []);

  if (error) {
    return <div className="padding-8 text-color-red">{error}</div>;
  }

  return (
    <List loose>
      {expenseGroups.map(({ _id, expenses, startDate, endDate, title }) => {
        return (
          <ListItem key={_id}>
            <h3>{title}</h3>
            <div>
              {moment(startDate).format('L')} - {moment(endDate).format('L')}
            </div>
            <div>
              {expenses
                .map(({ expense }) => {
                  return expense;
                })
                .join(', ')}
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

ExpenseGroupsPreview.propTypes = {};

ExpenseGroupsPreview.defaultProps = {};

export default ExpenseGroupsPreview;
