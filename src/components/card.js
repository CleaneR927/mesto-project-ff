import { cardTepmlate, popupDeleteCard } from '../index.js';
import { deleteCard, addLike, deleteLike } from './api.js';
import { closeModal } from './modal.js';

// @todo: Функция создания карточки

function createCardFunction(cardData, openImagePopup, onLikeCard, deleteCardPopup, mainId) {
  const cardElement = cardTepmlate.querySelector('.card').cloneNode(true);
  const cardDeleteIcon = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const imageAtr = cardElement.querySelector('img');
  const cardLike = cardElement.querySelector('.card__like');
  const cardLikeCount = cardLike.querySelector('.card__like-count');

  imageAtr.src = cardData.link;
  imageAtr.alt = cardData.alt;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData);
  });
  
  cardDeleteIcon.addEventListener('click', () => {
    deleteCardPopup(cardData, cardElement);
  });

  likeButton.addEventListener('click', () => {
    onLikeCard(cardData, cardLikeCount, likeButton, mainId, cardLike);
  });

  return cardElement;
};

// @todo: Функция удаления карточки

function onDeleteCard(cardData, cardElement) {
  cardElement.remove();
  deleteCard(cardData);
  closeModal(popupDeleteCard);
};

// @todo: Функция лайка

function onLikeCard(cardData, cardLikeCount, likeButton, mainId, cardLike) {
  likeButton.classList.toggle('card__like-button_is-active');
  
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeAdd(cardData, cardLikeCount, mainId, cardLike);
  } else {
    likeDelete(cardData, cardLikeCount, mainId, cardLike);
  }
};

// Функция добавления лайка карточке

function likeAdd(cardData, cardLikeCount, mainId, cardLike) {
  cardLikeCount.textContent = cardData.likes.length + 1;
  addLike(cardData);
};

// Функция удаления лайка с карточки

function likeDelete(cardData, cardLikeCount, mainId, cardLike) {
  cardLikeCount.textContent = cardData.likes.length - 1;
  deleteLike(cardData);
};

export{ createCardFunction, onLikeCard, onDeleteCard };