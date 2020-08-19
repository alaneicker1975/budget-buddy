import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { List, ListItem, Button } from '@alaneicker/atomik-ui';

const SideNav = ({ data, selectedExpenseId }) => {
  return (
    <div className="side-nav">
      <Button shape="square">+ New Group</Button>
      <List className="side-nav__menu">
        {data.map(({ _id, startDate, endDate }) => {
          return (
            <ListItem key={_id} className="side-nav__menu__item">
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
  selectedExpenseId: PropTypes.string,
};

SideNav.defaultProps = {
  data: [],
  selectedExpenseId: null,
};

export default SideNav;
