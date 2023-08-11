import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name = {'avatar'}
      title = {'Обновить аватар'}
      saveButtonText = {!props.isLoading ? 'Сохранить' : 'Сохранение...'}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >
      <input 
        className="popup__input"
        ref={avatarRef}
        id="user-avatar" 
        autoComplete="off" 
        type="url" 
        name="avatar" 
        placeholder="Ссылка на картинку" 
        required 
      />
      <span className="popup__input-error popup__input-error_type_hidden user-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;