const editButton = document.querySelector('.avatar__edit-icon');
const closeButton = document.querySelector('.form-popup__close-btn');
const popUpForm = document.querySelector('.form-popup');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');
const formElement = document.querySelector('.form-popup__form');
const cardTemplate = document.querySelector('#card__create').content;
const cardSection = document.querySelector('.photo-grid');




const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    
];

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

function createCard(arr) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.photo-grid__image').src = arr.link;
    cardElement.querySelector('.photo-grid__image').alt = arr.name;
    cardElement.querySelector('.photo-grid__name').textContent = arr.name;

    const likeButton = cardElement.querySelector('.photo-grid__like');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-grid__like_active');
        console.log(evt)
    })
    cardSection.append(cardElement);

};

initialCards.forEach(element => {
    createCard(element)
});


formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openClosePopup);
closeButton.addEventListener('click', openClosePopup);
