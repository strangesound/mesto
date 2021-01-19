export class Card {
  constructor(data, cardSelector, userId, callbacks) {
    this._createdCardImageAlt = data.name;
    this._createdCardImageSrc = data.link;
    this._createdCardLikes = data.likes;
    this._createdCardName = data.name;
    this._userId = userId;
    this._createdCardID = data._id;
    this._data = data
    this._ownerId = data.owner._id
    this._cardSelector = cardSelector;
    this._handleCardClick = callbacks.handleCardClick;
    this._handleLikeClick = callbacks.handleLikeClick;
    this._handleDeleteClick = callbacks.handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  _hideDeleteButton() {
    const thisUser = (this._ownerId === this._userId);
    return thisUser
  }

  setLikes(likes) {
    this._element.querySelector('.photo-grid__like-counter').textContent = likes.length;
    this._data.likes.forEach(element => {
      if (element._id === this._userId) {
        this._likeButton()
      }
    })

  }

  generateCard() {
    this._element = this._getTemplate();
    this.cardImage = this._element.querySelector('.photo-grid__image')
    this.cardImage.src = this._createdCardImageSrc;
    this.cardImage.alt = this._createdCardImageAlt;
    this._element.querySelector('.photo-grid__name').textContent = this._createdCardName;
    this.setLikes(this._createdCardLikes);


    if (!this._hideDeleteButton()) {
      this._element.querySelector('.photo-grid__delete-btn').classList.add('display');
    }
    this._setEventListeners();
    return this._element;

  }

  _setEventListeners() {
    const likeHeart = this._element.querySelector('.photo-grid__like')
    likeHeart.addEventListener('click', () => {
      this._likeButton();
      this._handleLikeClick(this._createdCardID, likeHeart.classList.contains('photo-grid__like_active'))
    });

    this._element.querySelector('.photo-grid__delete-btn').addEventListener('click', () => {
      this._handleDeleteClick(this._createdCardID);
    });

    this.cardImage.addEventListener('click', () => {
      this._handleCardClickHandler()
    });
  }

  _handleCardClickHandler() {
    this._handleCardClick(this._createdCardImageAlt, this._createdCardImageSrc)
  }

  _likeButton() {
    this._element.querySelector('.photo-grid__like')
      .classList.toggle('photo-grid__like_active');
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}


