import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name = {'user'}
      title = {'Редактировать профиль'}
      saveButtonText = {!props.isLoading ? 'Сохранить' : 'Сохранение...'}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >
      <input
        className="popup__input"
        value={name}
        onChange={handleChangeName}
        id="user-name" 
        autoComplete="off" 
        type="text" 
        name="userName" 
        placeholder="Имя" 
        minLength="2" 
        maxLength="40" 
        required 
      />
      <span className="popup__input-error popup__input-error_type_hidden user-name-error"></span>
      <input 
        className="popup__input"
        value={description}
        onChange={handleChangeDescription}
        id="user-profession" 
        autoComplete="off" 
        name="userProfession" 
        type="text" 
        placeholder="Профессия" 
        minLength="2" 
        maxLength="200" 
        required 
      />
      <span className="popup__input-error popup__input-error_type_hidden user-profession-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;