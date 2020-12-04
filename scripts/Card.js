import { openPopup } from './utils.js'

export class Card {
    constructor(arr, cardSelector) {
        this._createdCardImageAlt = arr.name;
        this._createdCardImageSrc = arr.link;
        this._createdCardName = arr.name;
        this._cardSelector = cardSelector;

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
        this._element.querySelector('.photo-grid__image').src = this._createdCardImageSrc;
        this._element.querySelector('.photo-grid__image').alt = this._createdCardImageAlt;
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

        this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
            this._createdCardBigImage();
        });
    }

    _likeButton() {
        this._element.querySelector('.photo-grid__like')
            .classList.toggle('photo-grid__like_active');
    }

    _cardDeleteBtn() {
        this._element.closest('.photo-grid__item').remove();
    }

    _createdCardBigImage() {
        this._bigImage = document.querySelector('.form-popup__image-big');

        this._bigImageCaption = document.querySelector('.form-popup__image-caption');
        this._bigImage.src = this._createdCardImageSrc;
        this._bigImage.alt = this._createdCardImageAlt;
        this._bigImageCaption.textContent = this._createdCardImageAlt;

        openPopup(document.querySelector('.form-popup_image-opener'));

    }

};


