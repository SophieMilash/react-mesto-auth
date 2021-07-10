import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_image">
        <button type="button" aria-label="Закрыть" title="Закрыть" className="button popup__close-button" onClick={props.onClose}></button>
        <figure className="popup__image-wrap">
          <img src={props.card.link} alt={props.card.name} className="popup__image" />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
