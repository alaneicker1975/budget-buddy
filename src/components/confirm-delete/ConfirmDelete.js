import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, Overlay, List, ListItem, Button } from '@alaneicker/atomik-ui';

const ConfirmDelete = ({ onConfirm, onCancel, children, isActive }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <Overlay isActive={active}>
      <Alert theme="warning" className="confirm-delete-alert">
        <div className="confirm-delete-alert__title">
          Are you sure you want to delete
        </div>
        <div className="confirm-delete-alert__subtitle">{children}</div>
        <List type="horizontal">
          <ListItem>
            <Button size="md" onClick={onConfirm}>
              Yes, Delete
            </Button>
          </ListItem>
          <ListItem>
            <Button size="md" onClick={onCancel}>
              Cancel
            </Button>
          </ListItem>
        </List>
      </Alert>
    </Overlay>
  );
};

ConfirmDelete.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  isActive: PropTypes.bool,
  children: PropTypes.node,
};

ConfirmDelete.defaultProps = {
  onConfirm() {},
  onCancel() {},
  isActive: false,
  children: <></>,
};

export default ConfirmDelete;
