// Создайте класс PopupWithImage
// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.

// slack
// Наследуется от Popup
// Функционал метода open базового класса расширится. Теперь в метод должны будут передаваться два параметра - ссылка и текст, и помимо открытия самого попапа, нужно подставить ещё данные в элементы на странице. Для корректной реализации наследования нужно вспомнить про super


import { Popup } from '../components/Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupWrapper) {
        super(popupWrapper)
        // this._popup = document.querySelector(popupWrapper);
        // this._image = data.image;
    }

    openPopup({name, link}) {
                // console.log('PopupWithImage/openpopup', name, link)

        this._bigImage = document.querySelector('.form-popup__image-big');
        this._bigImageCaption = document.querySelector('.form-popup__image-caption');
        this._bigImage.src = link;
        this._bigImage.alt = name;
        this._bigImageCaption.textContent = name;
        super.openPopup();

    }



}
