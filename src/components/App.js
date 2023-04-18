import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from './ImagePopup';
import { CurrentUserContext, currentUserInfo } from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [renderLoadingOn, setIsRenderLoadingOn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(currentUserInfo);

  React.useEffect(() => {
    api.getMyInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => { console.log(err) })
  }, []);

  React.useEffect(() => {
    api.getServerCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => { console.log(err) })
  }, [])

  function renderLoading() {
    setIsRenderLoadingOn((renderLoadingOn) => !renderLoadingOn);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function handleConfirmDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { console.log(err) })
  }

  function handleCardDelete() {
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== selectedCard._id))
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function handleAddCard(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function handleChangeProfile(userData) {
    api.changeProfileData(userData)
      .then((serverUserData) => {
        setCurrentUser(serverUserData)
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function handleChangeAvatar(userAvatar) {
    api.changeUserAvatar(userAvatar)
      .then((serverUserAvatar) => {
        setCurrentUser(serverUserAvatar)
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard({})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmDeleteClick}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleChangeProfile}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onChangeAvatar={handleChangeAvatar}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
