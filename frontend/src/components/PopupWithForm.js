import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onClick={props.onClose}>
      <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
        <button className="popup__close-button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button className="popup__save-button" type="submit">{props.saveButtonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;