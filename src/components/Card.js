import { PopupWithImage } from '../components/PopupWithImage.js'



// Класс Card
// Card нужно немного реорганизовать, если ещё не сделано при выполнении 7 проектной работы):
// В конструктор передаётся:  { data, handleCardClick }, templateSelector
// data - данные карточки. Почему данные карточки лучше передавать объектом, а не отдельными параметрами name, link. У карточки могут появиться новые поля - лайкнута ли она, количество лайков, автор карточки (в 9 проектной работе) и придётся менять вызов создания карточки во всей программе. Если же данные будут передаваться как объект, вызов создания карточки не изменится, так и будет передаваться объект, просто в нем будет чуть больше полей.
// handleCardClick - функция, которая описывает поведение при нажатии на картинку. Внутри передаваемого колбэка должен быть вызов метода open экземпляра класса PopupWithImage
// templateSelector - селектор темплейта карточки



export class Card {
    constructor(data, handleCardClick, cardSelector) {
        this._createdCardImageAlt = data.name;
        this._createdCardImageSrc = data.link;
        this._createdCardName = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.photo-grid__item')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this.cardImage = this._element.querySelector('.photo-grid__image')
        this.cardImage.src = this._createdCardImageSrc;
        this.cardImage.alt = this._createdCardImageAlt;
        this._element.querySelector('.photo-grid__name').textContent = this._createdCardName;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
            this._likeButton();
        });

        this._element.querySelector('.photo-grid__delete-btn').addEventListener('click', () => {
            this._cardDeleteBtn();
        });

        this.cardImage.addEventListener('click', () => {
            this._handleCardClickHandler()
        });
    }

    _handleCardClickHandler(){
        // console.log('card/_handleCardClickHandler', this._createdCardImageAlt, this._createdCardImageSrc,  this._handleCardClick)
        this._handleCardClick(this._createdCardImageAlt, this._createdCardImageSrc)


    }

    _likeButton() {
        this._element.querySelector('.photo-grid__like')
            .classList.toggle('photo-grid__like_active');
    }

    _cardDeleteBtn() {
        this._element.closest('.photo-grid__item').remove();
    }



    // handleCardClick - функция, которая описывает поведение при нажатии на картинку. Внутри передаваемого колбэка должен быть вызов метода open экземпляра класса PopupWithImage


};


