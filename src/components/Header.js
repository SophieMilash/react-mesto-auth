/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import * as menu from '../utils/menu.js';

function Header(props) {
  const location = useLocation();

  React.useEffect(() => {
    switchClass();
    window.addEventListener('resize', () => {
      switchClass();
    });
  });

  function switchClass() {
    menu.switchClass();
  }

  function handleHeaderBurgerClick() {
    menu.toggleHeaderBurger();
  }

  return (
    <header className="header page__section">
      {props.loggedIn &&
        <div className="header__info-wrap">
          <p className="header__user-email">{props.email}</p>
          <button type="submit" name="submit" onClick={props.onSignOut} className="button header__button">Выйти</button>
        </div>
      }
      <a href="#" target="_self">
        <img src={headerLogo} alt="Логотип Mesto Russia" className="header__logo" />
      </a>

      {props.loggedIn ?
        <button className="button header__burger" onClick={handleHeaderBurgerClick} >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>
        : location.pathname === '/sign-in' ? (
        <nav>
          <ul className="header__menu">
            <li>
              <Link to="/sign-up" className="header__link">Регистрация</Link>
            </li>
          </ul>
        </nav>
        ) : (
        <nav>
          <ul className="header__menu">
            <li>
              <Link to="/sign-in" className="header__link">Вход</Link>
            </li>
          </ul>
        </nav>
        )
      }
    </header>
  )
}

export default Header;
