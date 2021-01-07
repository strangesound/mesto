export class Popup {
    constructor(popupWrapper) {
        this._popup = popupWrapper;
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    closePopup() {
        this._popup.classList.remove("form-popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    openPopup() {
        this._popup.classList.add('form-popup_opened');
        document.addEventListener('keydown', this._handleEscClose);

        // document.addEventListener('keydown', event => {
        //     this._handleEscClose(event)});
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
        
        this._popup.addEventListener('click', event => {
            this._closeByOverlayClick(event)
        }
        );
    }
}
