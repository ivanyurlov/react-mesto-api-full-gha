import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import successIconPath from '../images/Success-Icon.svg';
import unsuccessIconPath from '../images/Unsuccess-Icon.svg';

function InfoTooltip(props) {
  const location = useLocation();

  return (
    <div className={`popup popup_info ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_info">
      {location.pathname === "/sign-up" && <Link to={props.isRegister ? "/sign-in" : "/sign-up"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
      {location.pathname === "/sign-in" && <Link to={props.isRegister ? "/" : "/sign-in"} className="popup__close-button" onClick={props.onClose}>{props.children}</Link>}
        <img className="popup__icon" alt="Иконка успешности" src={props.isRegister ? successIconPath : unsuccessIconPath} />
        <h2 className="popup__title popup__title_info">
          {props.isRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;