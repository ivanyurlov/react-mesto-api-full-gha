import React from 'react';
import basketCapPath from '../images/Basket-cap-Icon.png';
import basketBottomPath from '../images/Basket-bottom-Icon.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => (i === currentUser._id));
  const cardLikeButtonClassName = (`element__heart ${isLiked && "element__heart_active"}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onPopupWithConfirmationClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="element" key={props.card._id}>
      <div className="element__large">
        <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      </div>
      {isOwn && <button className="element__basket" type="button" onClick={handleDeleteClick}>
        <img className="element__basket-cap" alt="Иконка - крышка корзины" src={basketCapPath} />
        <img className="element__basket-bottom" alt="Иконка - низ корзины" src={basketBottomPath} />
      </button>}
      <div className="element__like">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-counter">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;