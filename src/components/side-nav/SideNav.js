import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { List, ListItem } from '@alaneicker/atomik-ui';

const SideNav = ({ data, selectedExpenseGroupId }) => {
  return (
    <div className="side-nav">
      <Link
        className="atomikui-btn atomikui-btn--primary atomikui-btn--square"
        to="/new-expense-group"
      >
        + New Group
      </Link>
      <List className="side-nav__menu">
        {data.map(({ _id, startDate, endDate }) => {
          return (
            <ListItem key={_id} className="side-nav__menu__item">
              <Link
                to={`/expense-group/${_id}`}
                className={classnames({
                  'is-active': _id === selectedExpenseGroupId,
                })}
              >
                {startDate} - {endDate}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </div>
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
  selectedExpenseGroupId: PropTypes.string,
};

SideNav.defaultProps = {
  data: [],
  selectedExpenseGroupId: null,
};

export default SideNav;
