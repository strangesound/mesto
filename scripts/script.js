const editButton = document.querySelector('.avatar__edit-icon');
const closeButtons = document.querySelectorAll('.form-popup__close-btn');
const popUpForm = document.querySelector('.form-popup_type_edit');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');
const formElement = document.querySelector('.form-popup__form-edit');

const cardTemplate = document.querySelector('#card__create').content;
const cardSection = document.querySelector('.photo-grid');

const formElementCardWrapper = document.querySelector('.form-popup_type_add-card');
const cardFormAddButton = document.querySelector('.avatar__add-button');
const cardName = document.querySelector('.form-popup__card_name');
const cardImgLink = document.querySelector('.form-popup__img-link');
const formElementCard = document.querySelector('.form-popup__form-add-card');

const imageOpenerSection = document.querySelector('.form-popup__image_opener');
const imageBig = document.querySelector('.form-popup__image-big');
const imageCaption = document.querySelector('.form-popup__image-caption');


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

function closePopup(popup) {
    const closestElement = popup.closest('.form-popup');
    closestElement.classList.remove("popup_opened");
    // console.log(popup)
}

function openPopup(popup) {
    popup.classList.add('popup_opened')
}

function fillNameJob(popup) {
    formNameInput.value = pageName.textContent;
    formJobInput.value = pageJob.textContent;
    openPopup(popup)
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    pageName.textContent = formNameInput.value;
    pageJob.textContent = formJobInput.value;
    // console.log(evt)
    closePopup(evt.target);
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    const newCardArray = {
        name: cardName.value,
        link: cardImgLink.value
    }
    // console.log(newCardArray, formElementCard)
    cardSection.prepend(createCard(newCardArray))
    closePopup(evt.target);
    evt.target.reset()


}

function createCard(arr) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.photo-grid__image').src = arr.link;
    cardElement.querySelector('.photo-grid__image').alt = arr.name;
    cardElement.querySelector('.photo-grid__name').textContent = arr.name;

    const likeButton = cardElement.querySelector('.photo-grid__like');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-grid__like_active');
        // console.log(evt)
    })

    const cardDeleteBtn = cardElement.querySelector('.photo-grid__delete-btn');
    cardDeleteBtn.addEventListener('click', () => deleteCard(cardDeleteBtn))

    const imageOpener = cardElement.querySelector('.photo-grid__image');
    imageOpener.addEventListener('click', function (evt) {
        // console.log(evt)
        imageBig.src = arr.link;
        imageCaption.textContent = arr.name;
        openPopup(imageOpenerSection)  
    })

    return cardElement;

};

function deleteCard(item) {
    // console.log(item)
    const listItem = item.closest('.photo-grid__item');
    // console.log(listItem)
    listItem.remove();
    // const cardDeleteBtn = document.querySelectorAll('.photo-grid__delete-btn');

};

// Создание изначального массива
initialCards.forEach(element => {
    cardSection.append(createCard(element))
});

// Обработчики событий

formElement.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', addCardFormSubmitHandler);

editButton.addEventListener('click', () => fillNameJob(popUpForm));
cardFormAddButton.addEventListener('click', () => openPopup(formElementCardWrapper));

closeButtons.forEach(element => {
    element.addEventListener('click', () => closePopup(element));
})
