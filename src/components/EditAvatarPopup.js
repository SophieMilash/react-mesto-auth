import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const [avatarValidityError, setAvatarValidityError] = React.useState('');
  const isSubmitDisabled = avatarValidityError || avatar === '';

  React.useEffect(() => {
    setAvatar('');
    setAvatarValidityError('');
  }, [props.isOpen]);

  function handleAvatarChange(e) {
    const avatarInput = e.target;
    const { value, validity, validationMessage } = avatarInput;
    setAvatar(value);

    if (validity.valueMissing) {
      setAvatarValidityError('Вы пропустили это поле');
    } else if (validity.typeMismatch) {
      setAvatarValidityError('Введите адрес сайта');
    } else {
      setAvatarValidityError(validationMessage);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar
    });
  }

  return (
    <PopupWithForm name="avatar-edit" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isFormLoading={props.isFormLoading} isSubmitDisabled={isSubmitDisabled} >
      <input type="url" name="link" required className="form__input" placeholder="Ссылка на картинку" value={avatar} onChange={handleAvatarChange} />
      {avatarValidityError && <span className="form__input-error">{avatarValidityError}</span>}
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
