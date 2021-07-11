import React from 'react';
import successIcon from '../images/success.svg';
import errorIcon from '../images/error.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_info">
        <button type="button" aria-label="Закрыть" title="Закрыть" className="button popup__close-button" onClick={props.onClose}></button>
        {/* <img src={successIcon} alt="Успешная регистрация" className="popup__info-icon" /> */}
        <img src={errorIcon} alt="Ошибка при регистрации" className="popup__info-icon" />
        <p className="popup__info-message">{props.message}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
