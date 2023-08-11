import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar-overlay">
            <img src={currentUser.avatar} alt="#" className="profile__avatar" onClick={props.onEditAvatar} />
            </div>
            <div className="profile__form">
              <div className="profile__text">
                <h1 className="profile__user-name">{currentUser.name}</h1>
                <p className="profile__activity">{currentUser.about}</p>
              </div>
              <button className="profile__edit-button" type="button" aria-label="Иконка - ручка" onClick={props.onEditProfile}></button>
            </div>
          </div>
          <button className="profile__add-button" type="button" aria-label="Иконка - плюс" onClick={props.onAddPlaceClick}></button>
        </section>
        <section className="elements" aria-label="Карточки">
          {props.cards.map((card) => (
            <Card
              key = {card._id}
              card = {card}
              onCardClick = {props.onCardClick}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onCardDelete}
              onPopupWithConfirmationClick = {props.onPopupWithConfirmationClick}
            />
          ))}
        </section>
      </main>
  );
}

export default Main;