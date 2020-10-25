let editButton = document.querySelector('.avatar__edit-icon');
let closeButton = document.querySelector('.form-popup__close-btn');
let popUpForm = document.querySelector('.form-popup');
let formNameInput = document.querySelector('.form-popup__contact-info_name');
let formJobInput = document.querySelector('.form-popup__contact-info_job');
let pageName = document.querySelector('.avatar__head');
let pageJob = document.querySelector('.avatar__subtitle');
let formElement = document.querySelector('.form-popup__form');


function openClosePopup() {
    if (popUpForm.classList.contains('popup_opened')) {
        popUpForm.classList.remove('popup_opened')
    }
    else {
        popUpForm.classList.add('popup_opened')
        formNameInput.value = pageName.textContent;
        formJobInput.value = pageJob.textContent;
    }
}

function formSubmitHandler(evt) {   
    evt.preventDefault();
    pageName.textContent = formNameInput.value;
    pageJob.textContent = formJobInput.value;
    openClosePopup()

}


formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openClosePopup);
closeButton.addEventListener('click', openClosePopup);
