import { cardTepmlate} from '../index.js';
import { addLikeSending, deleteLikeSending } from './api.js';

// @todo: Функция создания карточки

function createCardFunction(cardData, openImagePopup, onLikeCard, deleteCardPopup, onDeleteCard, userId) {
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

  if (cardData.owner._id !== userId) {
    cardDeleteIcon.classList.add('card__delete-button_novisible');
  }
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData);
  });
  
  cardDeleteIcon.addEventListener('click', () => {
    deleteCardPopup(cardData, cardElement, onDeleteCard);
  });

  likeButton.addEventListener('click', () => {
    onLikeCard(cardData, cardLikeCount, likeButton, userId);
  });

  return cardElement;
};

// @todo: Функция лайка

function onLikeCard(cardData, cardLikeCount, likeButton, userId) {
  likeButton.classList.toggle('card__like-button_is-active');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeAdd(cardData, cardLikeCount, userId);
  } else {
    likeDelete(cardData, cardLikeCount, userId);
  }
};

// Функция добавления лайка карточке

function likeAdd(cardData, cardLikeCount, userId) {
  addLikeSending(cardData)
    .then((res) => {
      if (res.likes.some(like => like._id === userId)) {
        cardLikeCount.textContent = res.likes.length;
      } else {
        cardLikeCount.textContent = res.likes.length + 1;
      } 
    })
    .catch((err) => {
      console.log('Не вышло добавить лайк'+ err);
    });
};

// Функция удаления лайка с карточки

function likeDelete(cardData, cardLikeCount, userId) {
  deleteLikeSending(cardData)
    .then((res) => {
      if (!res.likes.some(like => like._id === userId)) {
        cardLikeCount.textContent = res.likes.length;
      } else {
        cardLikeCount.textContent = res.likes.length - 1;
      }
    })
    .catch((err) => {
      console.log('Не вышло удалить лайк'+ err);
    });
};

export{ createCardFunction, onLikeCard };