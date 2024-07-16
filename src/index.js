import './pages/index.css';
import { initialCards } from './cards.js';
import { createCardFunction } from './card.js';
import { openModal, closeModal } from './modal.js';

  
const cardTepmlate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const container = content.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageClose = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');

// функция открытия изображения в модальном окне

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupTypeImageCaption.textContent = cardData.name;
  popupImage.alt = cardData.name;
  openModal(popupTypeImage);
};

// @todo: Функция удаления карточки

function onDeleteCard(evt) {
  evt.target.closest('.card').remove();
};

// @todo: Функция лайка

function onLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function createArrCards(cardData) {
  const cardArr = createCardFunction(cardData, openImagePopup, onDeleteCard, onLikeCard);
  container.append(cardArr);
});

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
  openModal(profilePopupEdit);
});

// Обработчик открытия окна добавление карточки

profileButtonAdd.addEventListener('click', () => {
  openModal(profilePopupAdd);
});

// Обработчик закрытия модального окна

profileEditButtonClose.addEventListener('click', () => {
  closeModal(profilePopupEdit);
});

profileAddButtonClose.addEventListener('click', () => {
  closeModal(profilePopupAdd);
});

popupImageClose.addEventListener('click', () => {
  closeModal(popupTypeImage);
});

// Обработчик закрытия модального окна кликом вне попапа

profilePopupEdit.addEventListener('mousedown', (evt) => {
  if (evt.target === profilePopupEdit) {
    closeModal(profilePopupEdit);
  }
});

profilePopupAdd.addEventListener('mousedown', (evt) => {
  if (evt.target === profilePopupAdd) {
    closeModal(profilePopupAdd);
  }
});

popupTypeImage.addEventListener('mousedown', (evt) => {
  if (evt.target === popupTypeImage) {
    closeModal(popupTypeImage);
  }
});

// Обработчик отправки формы редактирования профиля

const profilePopupFormEdit = profilePopupEdit.querySelector('.popup__form');
const profileNameInput = profilePopupFormEdit.querySelector('.popup__input_type_name');
const profileDescriptionInput = profilePopupFormEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function profilePopupFormEditSending (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profilePopupEdit);
};

profilePopupFormEdit.addEventListener('submit', profilePopupFormEditSending);

// Обработчик отправки формы создания карточки

const profilePopupFormAdd = profilePopupAdd.querySelector('.popup__form');
const profileAddCardName = profilePopupFormAdd.querySelector('.popup__input_type_card-name');
const profileAddCardLink = profilePopupFormAdd.querySelector('.popup__input_type_url');

function profilePopupFormAddSending (evt) {
  evt.preventDefault();
  const cardArr = createCardFunction({
    name: profileAddCardName.value,
    link: profileAddCardLink.value
  }, openImagePopup, onDeleteCard, onLikeCard);
  container.prepend(cardArr);
  closeModal(profilePopupAdd);
  profilePopupFormAdd.reset();
};

profilePopupFormAdd.addEventListener('submit', profilePopupFormAddSending);

export { cardTepmlate }; 