// ФУНКЦИЯ открытия модального окна редактирования профиля

const openModal = (evt) => {
  evt.style.visibility = 'visible';
  evt.style.opacity = 1;
};

// ФУНКЦИЯ закрытия модального окна редактирования профиля

const closeModal = (evt) => {
  evt.style.visibility = 'hidden';
  evt.style.opacity = 0;
};

// ФУНКЦИЯ обработчик события нажатия на Esc



// ФУНКЦИЯ обработчик события клика по оверлею


export { openModal, closeModal };