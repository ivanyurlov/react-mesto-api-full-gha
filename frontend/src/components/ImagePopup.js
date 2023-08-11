import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_large ${card.link ? "popup_opened" : ""}`} onClick={onClose}>
      <figure className="popup__container popup__container_large" onClick={(evt) => evt.stopPropagation()}>
        <button className="popup__close-button popup__close-button_large" onClick={onClose}></button>
        <img className="popup__photo" alt={card.name} src={card.link} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
