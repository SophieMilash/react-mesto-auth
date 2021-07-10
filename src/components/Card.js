import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `button card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
  );
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `button card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );


  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete();
    props.setCardDelete(props.card);
  }

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick} />
      </div>
      <button type="button" aria-label="Удалить" title="Удалить" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrap">
          <button type="button" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
