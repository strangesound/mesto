import { Popup } from '../components/Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupWrapper) {
    super(popupWrapper)
    this._bigImage = document.querySelector('.form-popup__image-big');
    this._bigImageCaption = document.querySelector('.form-popup__image-caption');
  }

  openPopup({name, link}) {
    this._bigImage.src = link;
    this._bigImage.alt = name;
    this._bigImageCaption.textContent = name;
    super.openPopup();

  }
}
