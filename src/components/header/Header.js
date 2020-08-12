import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ logo, logoText }) => {
  return (
    <div className="header">
      <div className="header__logo">{logo}</div>
      <div className="header__logo-text">{logoText}</div>
    </div>
  );
};

Header.propTypes = {
  logo: PropTypes.node,
  logoText: PropTypes.string,
};

Header.defaultProps = {
  logo: <></>,
  logoText: '',
};

export default Header;
