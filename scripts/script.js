import { Card } from './Card.js'
import { initialCards } from './initialCards.js'
// import { closePopup, openPopup, closeByEscape, closeByOverlayClick } from './utils.js'
import { Popup } from './Popup.js'
import { FormValidator } from './FormValidator.js'


const formEditUserInfoButton = document.querySelector('.avatar__edit-icon');
const closeButtons = document.querySelectorAll('.form-popup__close-btn');
const formEditUserInfoWrapper = document.querySelector('.form-popup_type_edit');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');
const formEditUserInfo = document.querySelector('.form-popup__form-edit');
const formEditUserInfoSubmitButton = formEditUserInfo.querySelector('.form-popup__btn')

const cardSection = document.querySelector('.photo-grid');

const formAddCardWrapper = document.querySelector('.form-popup_type_add-card');
const formAddCardButton = document.querySelector('.avatar__add-button');
const cardName = document.querySelector('.form-popup__contact-info_card-name');
const cardImgLink = document.querySelector('.form-popup__img-link');
const formAddCard = document.querySelector('.form-popup__form-add-card');
const formAddCardSubmitButton = formAddCard.querySelector('.form-popup__btn')

function fillNameJob() {
    formNameInput.value = pageName.textContent;
    formJobInput.value = pageJob.textContent;
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    pageName.textContent = formNameInput.value;
    pageJob.textContent = formJobInput.value;
    formEditUserInfoClass.closePopup();
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    const newCardArray = {
        name: cardName.value,
        link: cardImgLink.value
    }
    const card = new Card(newCardArray, '#card__create');
    const cardElement = card.generateCard();
    document.querySelector('.photo-grid').prepend(cardElement);
    formAddCardClass.closePopup();
}

// Создание начального массива карточек
initialCards.forEach((item) => {
    const card = new Card(item, '#card__create');
    const cardElement = card.generateCard();
    document.querySelector('.photo-grid').append(cardElement);
});


// Обработчики событий

const formAddCardClass = new Popup(formAddCardWrapper);
formAddCardClass.setEventListeners();
formEditUserInfo.addEventListener('submit', editFormSubmitHandler);

const formEditUserInfoClass = new Popup(formEditUserInfoWrapper);
formEditUserInfoClass.setEventListeners();
formAddCard.addEventListener('submit', addCardFormSubmitHandler);


formEditUserInfoButton.addEventListener('click', function () {
    fillNameJob(formEditUserInfoWrapper);
    formEditUserInfoClass.openPopup(formEditUserInfoWrapper);
    formEditUserInfo.querySelector("#first-name-error").textContent = '';

});




formAddCardButton.addEventListener('click', function () {
    formAddCard.reset()
    formAddCardClass.openPopup();
    addFormValidator.deactivateSubmitButton();
});



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