import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import successIcon from '../images/success.svg';
import errorIcon from '../images/error.svg';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeletionConfirmPopup from './DeletionConfirmPopup';
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import api from '../utils/api.js';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletionConfirmPopup, setDeletionConfirmPopup] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [registrationMessage, setRegistrationMessage] = React.useState('');
  const [registrationIcon, setRegistrationIcon] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    setIsLoading(true);

    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    if (localStorage.getItem('jwt')) {
      auth.checkToken(localStorage.getItem('jwt'))
        .then((res) => {
          handleLogin(res.data.email);
        })
        .catch((err) => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  React.useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }
    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
    };
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete() {
    setDeletionConfirmPopup(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletionConfirmPopup(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    setIsFormLoading(true);
    api.setUserInfo({ name, about })
      .then((data) => {
        setCurrentUser({
          name: name,
          about: about,
          avatar: data.avatar
        })
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFormLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsFormLoading(true);
    api.setAvatar({ avatar })
      .then((data) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: avatar
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFormLoading(false));
  }

  function handleAddCardSubmit({ name, link }) {
    setIsFormLoading(true);
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFormLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeletionConfirmClick() {
    setIsFormLoading(true);
    api.deleteCard(cardDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelete._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFormLoading(false));
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
    history.push('/');
  }

  function handleSignOut() {
    history.push('/sign-in');
    setUserEmail('');
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  function handleRegistrationSuccess() {
    setIsInfoTooltipOpen(true);
    setRegistrationIcon(successIcon);
    setRegistrationMessage('Вы успешно зарегистрировались!');
  }

  function handleRegistrationError() {
    setIsInfoTooltipOpen(true);
    setRegistrationIcon(errorIcon);
    setRegistrationMessage('Что-то пошло не так! Попробуйте ещё раз.');
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} onSignOut={handleSignOut} email={userEmail} />
        <Switch>
          <Route path="/sign-up">
            <Register onRegistrationSuccess={handleRegistrationSuccess} onRegistrationError={handleRegistrationError} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onCardClick={handleCardClick}
            cards={cards}
            isLoading={isLoading}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            setCardDelete={setCardDelete}
          />
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isFormLoading={isFormLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isFormLoading={isFormLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
          isFormLoading={isFormLoading}
        />
        <ImagePopup
          card={selectedCard !== null && selectedCard}
          onClose={closeAllPopups}
        />
        <DeletionConfirmPopup
          isOpen={isDeletionConfirmPopup}
          onClose={closeAllPopups}
          onConfirmDeletion={handleDeletionConfirmClick}
          isFormLoading={isFormLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          message={registrationMessage}
          icon={registrationIcon}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
