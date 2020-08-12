import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ logo, logoText }) => {
  return (
    <div className="header">
      <Link className="header__logo" to="/">
        <div className="header__logo__icon">{logo}</div>
        <div className="header__logo__text">{logoText}</div>
      </Link>
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
