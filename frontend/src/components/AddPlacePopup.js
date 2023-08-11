import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeCardName(event) {
    setPlace(event.target.value);
  }

  function handleChangeCardLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name: place,
      link: link,
    })
  }

  React.useEffect(() => {
    setPlace('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name = {'card'}
      title = {'Новое место'}
      saveButtonText = {!props.isLoading ? 'Создать' : 'Сохранение...'}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >
      <input 
        className="popup__input"
        value={place}
        onChange={handleChangeCardName} 
        id="input-title" 
        autoComplete="off" 
        type="text" name="name" 
        placeholder="Название" 
        minLength="2" 
        maxLength="30" 
        required 
      />
      <span className="popup__input-error popup__input-error_type_hidden input-title-error"></span>
      <input 
        className="popup__input"
        value={link}
        onChange={handleChangeCardLink} 
        id="input-url" 
        autoComplete="off" 
        type="url" name="link" 
        placeholder="Ссылка на картинку" 
        required 
      />
      <span className="popup__input-error popup__input-error_type_hidden input-url-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;