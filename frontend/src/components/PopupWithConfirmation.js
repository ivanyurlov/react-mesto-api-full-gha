import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name = {'confirm'}
      title = {'Вы уверены?'}
      saveButtonText = {!props.isLoading ? 'Да' : 'Удаление...'}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    />
  )
}

export default PopupWithConfirmation;