import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
// import { Popup } from './components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js'
import { UserInfo } from '../components/UserInfo.js';
import './index.css';


const formEditUserInfoButton = document.querySelector('.avatar__edit-icon');
const formEditUserInfoWrapper = document.querySelector('.form-popup_type_edit');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');

const formAddCardWrapper = document.querySelector('.form-popup_type_add-card');
const formAddCardButton = document.querySelector('.avatar__add-button');
const cardName = document.querySelector('.form-popup__contact-info_card-name');
const cardImgLink = document.querySelector('.form-popup__img-link');
const formAddCard = document.querySelector('.form-popup__form-add-card');

// Создание начального массива карточек

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const popupWithImageItem = new PopupWithImage(document.querySelector('.form-popup_image-opener'))
    popupWithImageItem.setEventListeners();
    const card = new Card(item, () => popupWithImageItem.openPopup(item), '#card__create');
    const cardElement = card.generateCard();
    cardsList.insertItemAfter(cardElement);
  }
}, '.photo-grid');

cardsList.renderItems()



// Форма добавления карточки

const formAddCardClass = new PopupWithForm(formAddCardWrapper, () => {
  const newCardArray = {
    name: cardName.value,
    link: cardImgLink.value
  }
  const card = new Card(newCardArray, () => {
    const popupWithImageItem2 = new PopupWithImage(document.querySelector('.form-popup_image-opener'))
    popupWithImageItem2.setEventListeners();
    popupWithImageItem2.openPopup(newCardArray)
  }, '#card__create');

  const cardElement = card.generateCard();

  const newSection = new Section({
    data: newCardArray,
    renderer: 'хз'
  }, '.photo-grid');
  newSection.insertItemBefore(cardElement)
});

formAddCardClass.setEventListeners();
formAddCardButton.addEventListener('click', () => {
  formAddCard.reset()
  formAddCardClass.openPopup();
  addFormValidator.deactivateSubmitButton();
});


// Форма добавления редактирования имени
const formEditUserInfoClass = new PopupWithForm(formEditUserInfoWrapper, () => {
  const userInfo2 = new UserInfo(pageName, pageJob);
  userInfo2.setUserInfo(formNameInput.value, formJobInput.value)
});

formEditUserInfoClass.setEventListeners();

formEditUserInfoButton.addEventListener('click', () => {
  const userInfo = new UserInfo(pageName, pageJob);
  const userData = userInfo.getUserInfo();
  formNameInput.value = userData.name;
  formJobInput.value = userData.info;
  formEditUserInfoClass.openPopup();

});

// Конфиг для валидации
const config = {
  formSelector: {
    formNameEditSelector: '.form-popup__form-edit',
    formCardAddSelector: '.form-popup__form-add-card'
  },
  inputSelector: '.form-popup__contact-info',
  submitButtonSelector: '.form-popup__btn',
  activeButtonClass: 'form-popup__btn-active',
  inputErrorClass: 'error',
  errorElementActive: 'error-class'
};


const editFormValidator = new FormValidator(config, config.formSelector.formNameEditSelector);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, config.formSelector.formCardAddSelector);
addFormValidator.enableValidation();