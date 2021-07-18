import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameValidityError, setNameValidityError] = React.useState('');
  const [descriptionValidityError, setDescriptionValidityError] = React.useState('');
  const isSubmitDisabled = (nameValidityError || name === '') || (descriptionValidityError || description === '');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameValidityError('');
    setDescriptionValidityError('');
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    const nameInput = e.target;
    const {value, validity, validationMessage} = nameInput;
    setName(value);

    if (validity.valueMissing) {
      setNameValidityError('Вы пропустили это поле');
    } else if (validity.tooShort) {
      setNameValidityError('Минимальня длина - 2 символа');
    } else {
      setNameValidityError(validationMessage);
    }
  }

  function handleDescriptionChange(e) {
    const descriptionInput = e.target;
    const {value, validity, validationMessage} = descriptionInput;
    setDescription(value);

    if (validity.valueMissing) {
      setDescriptionValidityError('Вы пропустили это поле');
    } else if (validity.tooShort) {
      setDescriptionValidityError('Минимальня длина - 2 символа');
    } else {
      setDescriptionValidityError(validationMessage);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isFormLoading={props.isFormLoading} isSubmitDisabled={isSubmitDisabled} >
      <input type="text" name="name" minLength="2" maxLength="40" className="form__input" placeholder="Имя" value={name} onChange={handleNameChange} required/>
      {nameValidityError && <span className="form__input-error">{nameValidityError}</span>}
      <input type="text" name="activity" minLength="2" maxLength="200" required className="form__input" placeholder="О себе" value={description} onChange={handleDescriptionChange} />
      {descriptionValidityError && <span className="form__input-error">{descriptionValidityError}</span>}
    </PopupWithForm>
  )
}

export default EditProfilePopup;
