import './pages/index.css';
import {initialCards, createCardFunc} from './cards.js';
import * as popupFunc from './modal.js';

  
const cardTepm = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const container = content.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupImageClose = popupTypeImage.querySelector('.popup__close');


// @todo: Функция удаления карточки

function delCardFunc(cardElem) {
  cardElem.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function createArrCards(element) {
  const cardArr = createCardFunc(element);
  container.append(cardArr);
});

export { cardTepm, container, popupTypeImage, popupImage, popupCaption, popupImageClose, delCardFunc }; 

const profilePopup = document.querySelector('.popup');
const profilePopupEdit = document.querySelector('.popup_type_edit');
const profilePopupAdd = document.querySelector('.popup_type_new-card');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profileButtonAdd = document.querySelector('.profile__add-button');
const profileEditButtonClose = profilePopupEdit.querySelector('.popup__close');
const profileAddButtonClose = profilePopupAdd.querySelector('.popup__close');


// Обработчик открытия окна редактирования профиля

profileButtonEdit.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  popupFunc.openModal(profilePopupEdit);
});

// Обработчик открытия окна добавление карточки

profileButtonAdd.addEventListener('click', () => {
  popupFunc.openModal(profilePopupAdd);
});

// Обработчик закрытия модального окна

profileEditButtonClose.addEventListener('click', () => {
  popupFunc.closeModal(profilePopupEdit);
});

profileAddButtonClose.addEventListener('click', () => {
  popupFunc.closeModal(profilePopupAdd);
});

// Обработчик закрытия модального окна кликом вне попапа

profilePopupEdit.addEventListener('mousedown', (evt) => {
  if (evt.target === profilePopupEdit) {
    popupFunc.closeModal(profilePopupEdit);
  }
});

profilePopupAdd.addEventListener('mousedown', (evt) => {
  if (evt.target === profilePopupAdd) {
    popupFunc.closeModal(profilePopupAdd);
  }
});

// Обработчик закрытия модального окна на Esc

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popupFunc.closeModal(profilePopupEdit);
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popupFunc.closeModal(profilePopupAdd);
  }
});

// Обработчик отправки формы редактирования профиля

const profilePopupFormEdit = profilePopupEdit.querySelector('.popup__form');
const profileNameInput = profilePopupFormEdit.querySelector('.popup__input_type_name');
const profileDescriptionInput = profilePopupFormEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


profilePopupFormEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  popupFunc.closeModal(profilePopup);
});

// Обработчик отправки формы создания карточки

const profilePopupFormAdd = profilePopupAdd.querySelector('.popup__form');
const profileAddCardName = profilePopupFormAdd.querySelector('.popup__input_type_card-name');
const profileAddCardLink = profilePopupFormAdd.querySelector('.popup__input_type_url');

profilePopupFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardArr = createCardFunc({
    name: profileAddCardName.value,
    link: profileAddCardLink.value
  });
  container.prepend(cardArr);
  popupFunc.closeModal(profilePopupAdd);
  profilePopupFormAdd.reset();
});
