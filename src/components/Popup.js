// Создайте класс Popup
// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.

// form-popup__form-add-card



export class Popup {
    constructor(popupWrapper) {
        this._popup = popupWrapper;
    }
    closePopup() {
        this._popup.classList.remove("form-popup_opened");
        this._popup.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._closeByOverlayClick);

    }

    openPopup() {
        // console.log('popup.js/openpopup', this._popup)
        this._popup.classList.add('form-popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        };
    }

    _closeByOverlayClick(evt) {
        if (evt.target.classList.contains('form-popup_opened')) {
            this.closePopup();
        }
    };

    setEventListeners() {
        const closeButton = this._popup.querySelector('.form-popup__close-btn');
        closeButton.addEventListener('click', this.closePopup.bind(this));
        document.addEventListener('keydown', event => {
            this._handleEscClose(event)});
        this._popup.addEventListener('click', event => {
            this._closeByOverlayClick(event)
        }
        );
    }
}

// ** Класс Popup
// В конструктор передаётся popupSelector - селектор конкретного попапа, можно передать не селектор, а сам DOM элемент. Но следите за именованием, если поле класса названо this._popupSelector - в нем должен быть именно селектор, а не DOM элемент, а если названо this._popup - в нем должен быть именно DOM элемент, а не селектор
// В классе Popup должно быть описано все, что относится к функционалу любого попапа:
// метод setEventListener навешивает обработчики на элементы попапа, это обработчик на кнопку закрытия, обработчик на закрытие по оверлею.
// метод open - открытие попапа. Обратите внимание, требование вешать обработчик закрытия по ESC при открытии попапа и снимать при его закрытии никуда не делось. Здесь придётся разобраться с bind
// метод close - закрытие попапа
// приватные методы самих обработчиков события - метод обработки события закрытия по ESC и метод обработки события закрытия по оверлею
