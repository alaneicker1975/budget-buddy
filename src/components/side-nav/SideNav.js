import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { List, ListItem } from '@alaneicker/atomik-ui';

const SideNav = ({ data }) => {
  return (
    <List className="side-nav" loose>
      {data.map(({ _id, startDate, endDate }) => {
        return (
          <ListItem key={_id} className="side-nav__item">
            <Link to={`/expense-group/${_id}`}>
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
};

SideNav.defaultProps = {
  data: [],
};

export default SideNav;
