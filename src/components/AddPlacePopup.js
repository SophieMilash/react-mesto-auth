import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [cardTitleValidityError, setCardTitleValidityError] = React.useState('');
  const [cardLinkValidityError, setCardLinkValidityError] = React.useState('');
  const isSubmitDisabled = (cardTitleValidityError || name === '') || (cardLinkValidityError || link === '');

  React.useEffect(() => {
    setName('');
    setLink('');
    setCardTitleValidityError('');
    setCardLinkValidityError('');
  }, [props.isOpen]);

  function handleNameChange(e) {
    const cardTitleInput = e.target;
    const {value, validity, validationMessage} = cardTitleInput;
    setName(value);

    if (validity.valueMissing) {
      setCardTitleValidityError('Вы пропустили это поле');
    } else if (validity.tooShort) {
      setCardTitleValidityError('Минимальня длина - 2 символа');
    } else {
      setCardTitleValidityError(validationMessage);
    }
  }

  function handleLinkChange(e) {
    const cardLinkInput = e.target;
    const {value, validity, validationMessage} = cardLinkInput;
    setLink(value);

    if (validity.valueMissing) {
      setCardLinkValidityError('Вы пропустили это поле');
    } else if (validity.typeMismatch) {
      setCardLinkValidityError('Введите адрес сайта');
    } else {
      setCardLinkValidityError(validationMessage);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddCard({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isFormLoading={props.isFormLoading} isSubmitDisabled={isSubmitDisabled} >
      <input type="text" name="title" value={name} minLength="2" maxLength="30" required className="form__input" placeholder="Название" onChange={handleNameChange} />
      {cardTitleValidityError && <span className="form__input-error">{cardTitleValidityError}</span>}
      <input type="url" name="link" value={link} required className="form__input" placeholder="Ссылка на картинку" onChange={handleLinkChange} />
      {cardLinkValidityError && <span className="form__input-error">{cardLinkValidityError}</span>}
    </PopupWithForm>
  )
}

export default AddPlacePopup;
