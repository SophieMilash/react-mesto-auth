import React from 'react';
import Loader from './Loader';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      {props.isLoading && (<Loader />)}

      <section className={`profile page__section page__section_place_profile ${props.isLoading && "page__section_hidden"}`}>
        <div className="profile__avatar-wrap">
          <img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
          <button type="button" aria-label="Редактировать" title="Редактировать" className="button profile__avatar-edit" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" aria-label="Редактировать" title="Редактировать" className="button button_action_edit profile__info-button" onClick={props.onEditProfile}></button>
          <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" title="Добавить" className="button button_action_add-card profile__button" onClick={props.onAddCard}></button>
      </section>

      <section className={`cards page__section page__section_place_cards ${props.isLoading && "page__section_hidden"}`}>
        {props.cards.map((card) => (
         <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} setCardDelete={props.setCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main;
