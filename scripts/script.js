const formEditUserInfoButton = document.querySelector('.avatar__edit-icon');
const closeButtons = document.querySelectorAll('.form-popup__close-btn');
const formEditUserInfoWrapper = document.querySelector('.form-popup_type_edit');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');
const formEditUserInfo = document.querySelector('.form-popup__form-edit');

const cardTemplate = document.querySelector('#card__create').content;
const cardSection = document.querySelector('.photo-grid');

const formAddCardWrapper = document.querySelector('.form-popup_type_add-card');
const formAddCardButton = document.querySelector('.avatar__add-button');
const cardName = document.querySelector('.form-popup__contact-info_card-name');
const cardImgLink = document.querySelector('.form-popup__img-link');
const formAddCard = document.querySelector('.form-popup__form-add-card');

const bigImageWrapper = document.querySelector('.form-popup_image-opener');
const bigImage = document.querySelector('.form-popup__image-big');
const bigImageCaption = document.querySelector('.form-popup__image-caption');


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
    popup.classList.remove("form-popup_opened");
}

function openPopup(popup) {
    popup.classList.add('form-popup_opened')
}

function fillNameJob(popup) {
    formNameInput.value = pageName.textContent;
    formJobInput.value = pageJob.textContent;
    openPopup(formEditUserInfoWrapper)
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
    cardSection.prepend(createCard(newCardArray))
    closePopup(formAddCardWrapper);
    evt.target.reset()
}

function createCard(arr) {
    const cardElement = cardTemplate.cloneNode(true);
    const createdCardImage = cardElement.querySelector('.photo-grid__image');
    const createdCardName = cardElement.querySelector('.photo-grid__name')
    
    createdCardImage.alt = arr.name;
    createdCardImage.src = arr.link;
    createdCardName.textContent = arr.name;

    const likeButton = cardElement.querySelector('.photo-grid__like');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-grid__like_active');
    })

    const cardDeleteBtn = cardElement.querySelector('.photo-grid__delete-btn');
    cardDeleteBtn.addEventListener('click', () => deleteCard(cardDeleteBtn))

    createdCardImage.addEventListener('click', function (evt) {
        bigImage.src = arr.link;
        bigImageCaption.textContent = arr.name;
        openPopup(bigImageWrapper)
    })
    return cardElement;
};

function deleteCard(item) {
    const listItem = item.closest('.photo-grid__item');
    listItem.remove();
};

// Создание изначального массива
initialCards.forEach(element => {
    cardSection.append(createCard(element))
});

// Обработчики событий
formEditUserInfo.addEventListener('submit', editFormSubmitHandler);
formAddCard.addEventListener('submit', addCardFormSubmitHandler);

formEditUserInfoButton.addEventListener('click', () => fillNameJob(formEditUserInfoWrapper));
formAddCardButton.addEventListener('click', () => openPopup(formAddCardWrapper));

closeButtons.forEach(element => {
    element.addEventListener('click', () => closePopup(element.closest('.form-popup')));
})
