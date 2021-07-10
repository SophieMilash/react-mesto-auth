/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__section page__section_place_header">
      <a href="#" target="_self">
        <img src={headerLogo} alt="Логотип Mesto Russia" className="header__logo" />
      </a>
    </header>
  )
}

export default Header;
