import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_info">
        <button type="button" aria-label="Закрыть" title="Закрыть" className="button popup__close-button" onClick={props.onClose}></button>
        <img src={props.icon} alt="Статус регистрации" className="popup__info-icon" />
        <p className="popup__info-message">{props.message}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
