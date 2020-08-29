import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Overlay, List, ListItem, Button } from '@alaneicker/atomik-ui';

const ConfirmDelete = ({
  expense,
  expenseId,
  groupId,
  isActive,
  routePath,
}) => {
  return (
    <Overlay isActive>
      <Alert theme="warning" className="confirm-delete-alert">
        <div className="confirm-delete-alert__title">
          Are you sure you want to delete
        </div>
        <div className="confirm-delete-alert__subtitle">{expense}</div>
        <List type="horizontal">
          <ListItem>
            <Button size="md">Yes, Delete</Button>
          </ListItem>
          <ListItem>
            <Button size="md">Cancel</Button>
          </ListItem>
        </List>
      </Alert>
    </Overlay>
  );
};

ConfirmDelete.propTypes = {
  isActive: PropTypes.bool,
  expense: PropTypes.string,
  expenseId: PropTypes.string,
  groupId: PropTypes.string,
  routePath: PropTypes.string,
};

ConfirmDelete.defaultProps = {
  isActive: false,
  expense: '',
  expenseId: '',
  groupId: '',
  routePath: '',
};

export default ConfirmDelete;
