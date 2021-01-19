// import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { FormValidator } from '../components/FormValidator.js'
import { UserInfo } from '../components/UserInfo.js';
import { config } from '../components/constants.js';
import { Api } from '../components/Api.js';

import './index.css';

const formEditUserInfoButton = document.querySelector('.avatar__edit-icon');
const formEditUserInfoWrapper = document.querySelector('.form-popup_type_edit');
const formNameInput = document.querySelector('.form-popup__contact-info_name');
const formAvatarURLInput = document.querySelector('.form-popup__img-link-avatar');
const formJobInput = document.querySelector('.form-popup__contact-info_job');
const pageName = document.querySelector('.avatar__head');
const pageJob = document.querySelector('.avatar__subtitle');
const avatarImage = document.querySelector('.avatar__kusto')

const formAddCardWrapper = document.querySelector('.form-popup_type_add-card');
const formAddCardButton = document.querySelector('.avatar__add-button');
const cardName = document.querySelector('.form-popup__contact-info_card-name');
const cardImgLink = document.querySelector('.form-popup__img-link');
const formAddCard = document.querySelector('.form-popup__form-add-card');

// Создание начального массива карточек
const popupWithImageItem = new PopupWithImage(document.querySelector('.form-popup_image-opener'));
popupWithImageItem.setEventListeners();

let myId;
const popupConfirm = new PopupConfirm(document.querySelector('.form-popup__delete-confirmation'));
popupConfirm.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    data,
    '#card__create',
    myId,
    {
      handleCardClick: () => {
        popupWithImageItem.openPopup(data)
      },
      handleLikeClick: (data, isLiked) => {
        if (!isLiked) {

          api.removeLike(data)
            .then((res) => {
              console.log('my id is', myId)
              card.setLikes(res.likes)
            })
            .catch((err) => {
              console.log('removeLike', err)
            })
        }
        {
          api.setLike(data)
            .then((res) => {
              card.setLikes(res.likes)
            })
            .catch((err) => {
              console.log('setLike', err)
            })
        }
      },
      handleDeleteClick: (cardId) => {
        popupConfirm.setSubmitAction(()=> {
          api.removeCard(cardId)
            .then(() => {
              card.removeCard(); //
              popupConfirm.closePopup() 
            })
            .catch((err) => {
              console.log('handleDeleteClick', err)
            })
        });
        popupConfirm.openPopup();
      }
    })
  return card
}








// Правим аватар
const editAvatarbutton = document.querySelector('.avatar__image-wrapper');
const formEditUserAvatarWrapper = document.querySelector('.form-popup__type-avatar-edit');
const editAvatarFormSubmitbutton = formEditUserAvatarWrapper.querySelector('.form-popup__btn');
// console.log(editAvatarFormSubmitbutton.textContent, editAvatarFormSubmitbutton.value)

const formEditAvatar = new PopupWithForm(formEditUserAvatarWrapper, () => {
  formEditAvatar.renderLoading(true, editAvatarFormSubmitbutton);

  api.patchAvatarImage(formAvatarURLInput.value)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      userInfo.setAvatarImage(res.avatar)
    })
    .catch((err) => {
      console.log('patchAvatarImage', err)
    })
    .finally(() => {
      formEditAvatar.renderLoading(false, editAvatarFormSubmitbutton);
    })
});

formEditAvatar.setEventListeners();

editAvatarbutton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formNameInput.value = userData.name;
  formJobInput.value = userData.info;
  avatarChangeImage.deactivateSubmitButton()
  formEditAvatar.openPopup();
})


// Форма добавления карточки

const formAddCardClass = new PopupWithForm(formAddCardWrapper, () => {
  const newCardArray = {
    name: cardName.value,
    link: cardImgLink.value
  }


  api.addNewCard(newCardArray)
    .then((res) => {
      // console.log(res)
      const newCard = createCard(res)

      // console.log(newCard.generateCard();)
      cardsList.insertItemBefore(newCard.generateCard())

    })
    .catch((err) => {
      console.log('Ошибка в addNewCard', err)
    })

});

formAddCardClass.setEventListeners();
formAddCardButton.addEventListener('click', () => {
  formAddCard.reset()
  formAddCardClass.openPopup();
  addFormValidator.deactivateSubmitButton();
});


// Форма добавления редактирования имени
const userInfo = new UserInfo(pageName, pageJob, avatarImage);

const formEditUserInfoClass = new PopupWithForm(formEditUserInfoWrapper, () => {
  // userInfo.setUserInfo(formNameInput.value, formJobInput.value)
  // задаём кнопке отправки текст "Сохранение..."
  api.patchUserInfo(formNameInput.value, formJobInput.value)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
    })
    .catch((err) => {
      console.log('Ошибка в patchUserInfo', err)
    })
  // .finally(() => {
  //   возвращаем обратно текст кнопки
  // 
});



formEditUserInfoClass.setEventListeners();

formEditUserInfoButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formNameInput.value = userData.name;
  formJobInput.value = userData.info;
  formEditUserInfoClass.openPopup();

});


// Валидация форм

const editFormValidator = new FormValidator(config, config.formSelector.formNameEditSelector);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, config.formSelector.formCardAddSelector);
addFormValidator.enableValidation();

const avatarChangeImage = new FormValidator(config, config.formSelector.formAvatarChangeImage);
avatarChangeImage.enableValidation();
// console.log(avatarChangeImage)
const cardDeleteConfirmation = new FormValidator(config, config.formSelector.formCardDeleteConfirmation);
cardDeleteConfirmation.enableValidation();




// Один раз создаем экземпляр класса Api
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-19',
  token: '573df025-a590-432a-b9ad-3031215c8ade'
})

// Один раз создаем экземпляр класса Section
const cardsList = new Section({
  renderer: (item) => {

    const oneCard = createCard(item)
    const cardElement = oneCard.generateCard();
    cardsList.insertItemAfter(cardElement);
  }
}, '.photo-grid');

//в Promise.all передаем массив промисов , которые нужно выполнить 
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((values) => {    //
    userInfo.setUserInfo(values[0].name, values[0].about, values[0].avatar);
    myId = values[0]._id
    cardsList.renderItems(values[1])
    // console.log(cardsList, values[1])
  })
  .catch((err) => {
    console.log(err)
  })
