import { Popup } from '../components/Popup.js'

export class PopupConfirm extends Popup {
  constructor(popupWrapper) {
    super(popupWrapper)
    this._popupWrapper = popupWrapper;
    // this._submitFormHandler = submitFormHandler;
    this._form = this._popupWrapper.querySelector('.form-popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });

  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }


}
