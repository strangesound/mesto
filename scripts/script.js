//Антон, привет! Спасибо за ревью! Надеюсь, я правильно понял про "один универсальный конфигурационный объект". 
//Если я выношу темплэйты в конец html, то при отправке кода ругается на БЭМ-классы"



const formEditUserInfoButton = document.querySelector('.avatar__edit-icon');
const closeButtons = document.querySelectorAll('.form-popup__close-btn');
const formEditUserInfoWrapper = document.querySelector('.form-popup_type_edit');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');
const formEditUserInfo = document.querySelector('.form-popup__form-edit');
const formEditUserInfoSubmitButton = formEditUserInfo.querySelector('.form-popup__btn')


const cardTemplate = document.querySelector('#card__create').content;
const cardSection = document.querySelector('.photo-grid');

const formAddCardWrapper = document.querySelector('.form-popup_type_add-card');
const formAddCardButton = document.querySelector('.avatar__add-button');
const cardName = document.querySelector('.form-popup__contact-info_card-name');
const cardImgLink = document.querySelector('.form-popup__img-link');
const formAddCard = document.querySelector('.form-popup__form-add-card');
const formAddCardSubmitButton = formAddCard.querySelector('.form-popup__btn')


const bigImageWrapper = document.querySelector('.form-popup_image-opener');
const bigImage = document.querySelector('.form-popup__image-big');
const bigImageCaption = document.querySelector('.form-popup__image-caption');




function closePopup(popup) {
    popup.classList.remove("form-popup_opened");
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlayClick);

}

function openPopup(popup) {
    popup.classList.add('form-popup_opened');
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlayClick);
}

function closeByEscape(evt) {
    const escButton = "Escape"
    if (evt.key === escButton) {
        const currentPopup = document.querySelector('.form-popup_opened')
        closePopup(currentPopup);
    };
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('form-popup_opened')) {
        closePopup(evt.target);

    }
}

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
    cardSection.prepend(createCard(newCardArray))
    closePopup(formAddCardWrapper);
    // evt.target.reset()
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

    createdCardImage.addEventListener('click', function () {
        bigImage.src = arr.link;
        bigImage.alt = arr.name;
        bigImageCaption.textContent = arr.name;
        openPopup(bigImageWrapper)
    })
    return cardElement;
}

function deleteCard(item) {
    const listItem = item.closest('.photo-grid__item');
    listItem.remove();
}



// Создание изначального массива
initialCards.forEach(element => {
    cardSection.append(createCard(element))
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
    enableValidation(config, config.formSelector.formCardAddSelector);
});


closeButtons.forEach(element => {
    element.addEventListener('click', () => closePopup(element.closest('.form-popup')));
})



