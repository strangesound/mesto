function closePopup(popup) {
    popup.classList.remove("form-popup_opened");
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlayClick);

}

function openPopup(popup) {
    popup.classList.add('form-popup_opened');
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlayClick);
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const currentPopup = document.querySelector('.form-popup_opened')
        closePopup(currentPopup);
    };
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('form-popup_opened')) {
        closePopup(evt.target);

    }
}

export { closePopup, openPopup, closeByEscape, closeByOverlayClick }