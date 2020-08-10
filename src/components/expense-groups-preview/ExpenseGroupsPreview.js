import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, List, ListItem } from '@alaneicker/atomik-ui';
import './expense-groups-preview.scss';

const ExpenseGroupsPreview = ({ data }) => {
  return (
    <List className="expense-groups-list" loose>
      {data.map(({ _id, expenses, startDate, endDate, title }) => {
        return (
          <ListItem key={_id} className="expense-groups-list__item">
            <div className="expense-groups-list__item__hd">
              <h3>{title}</h3>
              <h4>
                {moment(startDate).format('L')} - {moment(endDate).format('L')}
              </h4>
            </div>
            <div className="expense-groups-list__item__bd">
              <div className="margin-bottom-16">
                {expenses
                  .map(({ expense }) => {
                    return expense;
                  })
                  .join(', ')}
              </div>
              <Button size="md" condensed>
                View Expense Group
              </Button>
            </div>
          </ListItem>
        );
      })}
    </List>
  );
};

ExpenseGroupsPreview.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      expenses: PropTypes.array,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};

ExpenseGroupsPreview.defaultProps = {
  data: [],
};

export default ExpenseGroupsPreview;
