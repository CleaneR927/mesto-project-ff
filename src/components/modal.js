// ФУНКЦИЯ открытия модального окна редактирования профиля

const openModal = (popupElement) => {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
};

// ФУНКЦИЯ закрытия модального окна редактирования профиля

const closeModal = (popupElement) => {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup);
};

// ФУНКЦИЯ закрытия модального окна по Esc
function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

export { openModal, closeModal };