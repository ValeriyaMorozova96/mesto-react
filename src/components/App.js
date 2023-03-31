import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  }


  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        submitcaption="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <fieldset className="form__fieldset">
            <input id='name-field' className="form__field form__field_type_name" type="text" placeholder="Имя"
              name="name" minLength="2" maxLength="40" required />
            <span className="form__field-error name-field-error"></span>
            <input id='job-field' className="form__field form__field_type_job" type="text" placeholder="О себе"
              name="about" minLength="2" maxLength="200" required />
            <span className="form__field-error job-field-error"></span>
          </fieldset>
        }
      />
      <PopupWithForm
        name="add-new-card"
        title="Новое место"
        submitcaption="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <fieldset className="form__fieldset">
            <input id='place-field' className="form__field form__field_type_place" type="text"
              placeholder="Название" name="place" minLength="2" maxLength="30" required />
            <span className="form__field-error place-field-error"></span>
            <input id='link-field' className="form__field form__field_type_image-link" type="url"
              placeholder="Ссылка на картинку" name="link" required />
            <span className="form__field-error link-field-error"></span>
          </fieldset>
        }
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        submitcaption="Да"
      />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        submitcaption="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <fieldset className="form__fieldset">
            <input id='avatar-field' className="form__field form__field_type_avatar" type="url"
              placeholder="Ссылка на аватар" name="avatar" required />
            <span className="form__field-error avatar-field-error"></span>
          </fieldset>
        }
      />
    </div>
  );
}

export default App;
