import { Card } from './Card.js'
import { initialCards } from './initialCards.js'
import { closePopup, openPopup, closeByEscape, closeByOverlayClick } from './utils.js'


const formEditUserInfoButton = document.querySelector('.avatar__edit-icon');
const closeButtons = document.querySelectorAll('.form-popup__close-btn');
const formEditUserInfoWrapper = document.querySelector('.form-popup_type_edit');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');
const formEditUserInfo = document.querySelector('.form-popup__form-edit');
const formEditUserInfoSubmitButton = formEditUserInfo.querySelector('.form-popup__btn')


// const cardTemplate = document.querySelector('#card__create').content;
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

    closePopup(formEditUserInfoWrapper);
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
    closePopup(formAddCardWrapper);
}

// Создание начального массива карточек
initialCards.forEach((item) => {
    const card = new Card(item, '#card__create');
    const cardElement = card.generateCard();
    document.querySelector('.photo-grid').append(cardElement);
});



// Обработчики событий
formEditUserInfo.addEventListener('submit', editFormSubmitHandler);
formAddCard.addEventListener('submit', addCardFormSubmitHandler);



//formEditUserInfoButton.addEventListener('click', () => fillNameJob(formEditUserInfoWrapper));

formEditUserInfoButton.addEventListener('click', function () {
    fillNameJob(formEditUserInfoWrapper);
    openPopup(formEditUserInfoWrapper);
    formEditUserInfo.querySelector("#first-name-error").textContent = '';

});


formAddCardButton.addEventListener('click', function () {
    formAddCard.reset()
    openPopup(formAddCardWrapper);
    deactivateSubmitButton(formAddCardSubmitButton);
    //enableValidation(config, config.formSelector.formCardAddSelector);
});


closeButtons.forEach(element => {
    element.addEventListener('click', () => closePopup(element.closest('.form-popup')));
})



