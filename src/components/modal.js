export function openPopup(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

export function closeOverlay(evt, popup) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
}

export function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}