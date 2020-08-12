import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { List, ListItem } from '@alaneicker/atomik-ui';

const SideNav = ({ data, selectedExpenseId }) => {
  return (
    <List className="side-nav">
      {data.map(({ _id, startDate, endDate }) => {
        return (
          <ListItem key={_id} className="side-nav__item">
            <Link
              to={`/expense-group/${_id}`}
              className={classnames({
                'is-active': _id === selectedExpenseId,
              })}
            >
              {moment(startDate).format('L')} - {moment(endDate).format('L')}
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

SideNav.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
  ),
  selectedExpenseId: PropTypes.string,
};

SideNav.defaultProps = {
  data: [],
  selectedExpenseId: null,
};

export default SideNav;
