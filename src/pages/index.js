import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js'
import { UserInfo } from '../components/UserInfo.js';
import {config} from '../components/constants.js';

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
const popupWithImageItem = new PopupWithImage(document.querySelector('.form-popup_image-opener'))
popupWithImageItem.setEventListeners();

const createCard = (item) => {
  return new Card(item, 
    () => popupWithImageItem.openPopup(item), 
    '#card__create');}


const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card  = createCard(item)
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
  const card = createCard(newCardArray)
  const cardElement = card.generateCard();
  cardsList.insertItemBefore(cardElement)

});

formAddCardClass.setEventListeners();
formAddCardButton.addEventListener('click', () => {
  formAddCard.reset()
  formAddCardClass.openPopup();
  addFormValidator.deactivateSubmitButton();
});


// Форма добавления редактирования имени
const userInfo = new UserInfo(pageName, pageJob);

const formEditUserInfoClass = new PopupWithForm(formEditUserInfoWrapper, () => {
  userInfo.setUserInfo(formNameInput.value, formJobInput.value)
});

formEditUserInfoClass.setEventListeners();

formEditUserInfoButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formNameInput.value = userData.name;
  formJobInput.value = userData.info;
  formEditUserInfoClass.openPopup();

});


const editFormValidator = new FormValidator(config, config.formSelector.formNameEditSelector);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, config.formSelector.formCardAddSelector);
addFormValidator.enableValidation();