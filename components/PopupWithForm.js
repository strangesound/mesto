// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

import { Popup } from '../components/Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupWrapper, submitFormHandler) {
        super(popupWrapper)
        this._popupWrapper = popupWrapper;
        this._submitFormHandler = submitFormHandler;
        // const inputSelector = '.form-popup__contact-info';
        // console.log('1', this._popupWrapper)
        this._inputList = Array.from(this._popupWrapper.querySelectorAll('.form-popup__contact-info'));
    }

    _getInputValues() {
        this._formValues = {}
        this._inputList.array.forEach(element => {
            this._formValues[element] = input.value
        });
        return this._formValues
        console.log('values', this._formValues)
    }

    setEventListeners() {
        super.setEventListeners();
        const form = this._popupWrapper.querySelector('.form-popup__form');
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // pageName.textContent = formNameInput.value;
            // pageJob.textContent = formJobInput.value;
            this._submitFormHandler();
            this.closePopup();
        });

    }

    closePopup() {
        super.closePopup();
        this._popupWrapper.querySelector('.form-popup__form').reset();

    }

}
