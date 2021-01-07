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
            this._handleDeleteCard();
        });

        this.cardImage.addEventListener('click', () => {
            this._handleCardClickHandler()
        });
    }

    _handleCardClickHandler(){
        this._handleCardClick(this._createdCardImageAlt, this._createdCardImageSrc)
    }

    _likeButton() {
        this._element.querySelector('.photo-grid__like')
            .classList.toggle('photo-grid__like_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }
};


