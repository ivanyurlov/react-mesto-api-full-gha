import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function BurgerNavBar(props) {
  const location = useLocation();

  function handleSignOutClick() {
    props.onSignOut();
  }

  return (
    <div className={`burger-nav-bar ${props.isOpen ? "burger-nav-bar_opened" : ""}`}>
      {location.pathname === "/" && <p className="burger-nav-bar__email">{props.userEmail}</p>}
      {location.pathname === "/" && <Link to="/sign-in" onClick={handleSignOutClick} className="burger-nav-bar__link">Выйти</Link>}
      {location.pathname === "/sign-up" && <Link to="/sign-in" className="burger-nav-bar__link">Войти</Link>}
      {location.pathname === "/sign-in" && <Link to="/sign-up" className="burger-nav-bar__link">Регистрация</Link>}
      <button className="burger-nav-bar__close-button" onClick={props.onClose}></button>
    </div>
  );
}

export default BurgerNavBar;