import * as popupFunc from './modal.js';
import { cardTepm, container, popupTypeImage, popupImage, popupCaption, popupImageClose, delCardFunc } from './index.js';

const arkhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinsk_oblastImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorsky_rayonImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

const initialCards = [
  { name: 'Архыз', link: arkhyzImage, alt: "Красивы горы и холмы Архыза." },
  { name: 'Челябинская область', link: chelyabinsk_oblastImage, alt: "Не замерзшая река в Челябинской области." },
  { name: 'Иваново', link: ivanovoImage, alt: "Вид на тихий квартал города Иваново." },
  { name: 'Камчатка', link: kamchatkaImage, alt: "Тундровые просторы Камчати на фоне заснеженных гор." },
  { name: 'Холмогорский район', link: kholmogorsky_rayonImage, alt: "Окруженная лесом, железная дорога Холмогорского района, уходящая в даль." },
  { name: 'Байкал', link: baikalImage, alt: "Прибрежные зимние скалы озера 'Байкал'." },
]; 

// @todo: Функция создания карточки

function createCardFunc(element) {
  const cardElem = cardTepm.querySelector('.card').cloneNode(true);
  const imageAtr = cardElem.querySelector('img');
  
  imageAtr.src = element.link;
  imageAtr.alt = element.alt;
  cardElem.querySelector('.card__title').textContent = element.name;

  // Обработчик открытия изображения на весь экран

  container.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;
      popupCaption.textContent = evt.target.alt;
      popupFunc.openModal(popupTypeImage);
    };
  });

  popupImageClose.addEventListener('click', () => {
    popupFunc.closeModal(popupTypeImage);
  });

  cardElem.querySelector('.card__like-button').addEventListener('click', function() {
    cardElem.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
  });

  cardElem.querySelector('.card__delete-button').addEventListener('click', function() {
    delCardFunc(cardElem);
  });

  return cardElem;
};

export{ initialCards, createCardFunc };
