let editButton = document.querySelector('.avatar__edit-icon');
let closeButton = document.querySelector('.form-popup__close-btn');
let popUpForm = document.querySelector('.form-popup');
let popupButton = document.querySelector('.form-popup__btn');
let formNameInput = document.querySelector('.form-popup__name');
let formJobInput = document.querySelector('.form-popup__job');
let pageName = document.querySelector('.avatar__head');
let pageJob = document.querySelector('.avatar__subtitle');
let formElement = document.querySelector('.form-popup__form')


function addPopup() {
    popUpForm.classList.add('popup_opened')
    formNameInput.value = pageName.textContent;;
    formJobInput.value = pageJob.textContent;
}

function clsPopup() {
    popUpForm.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    pageName.textContent = formNameInput.value
    pageJob.textContent = formJobInput.value
    clsPopup()
}


formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', addPopup);
closeButton.addEventListener('click', clsPopup);
// popUpForm.addEventListener('click', clsPopup);