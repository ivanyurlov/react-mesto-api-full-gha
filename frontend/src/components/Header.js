import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logoPath from '../images/logo.svg';


function Header(props) {
  const location = useLocation();

  function handleSignOutClick() {
    props.onSignOut();
  }

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logoPath} />
      <div className="signin">
        <div className="signin__main">
          {location.pathname === "/" && <p className="signin__email">{props.userEmail}</p>}
          {location.pathname === "/" && <Link to="/sign-in" onClick={handleSignOutClick} className="signin__link">Выйти</Link>}
        </div>
        {location.pathname === "/" && <button className={`signin-burger ${props.isOpen ? "signin-burger_hidden" : ""}`} onClick={props.onBurgerNavBar}>
          <span className="signin-burger__item"></span>
        </button>}
        {location.pathname === "/sign-up" && <Link to="/sign-in" className="signin__link">Войти</Link>}
        {location.pathname === "/sign-in" && <Link to="/sign-up" className="signin__link">Регистрация</Link>}
      </div>
    </header>
  );
}

export default Header;