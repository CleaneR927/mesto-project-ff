import { cardTepmlate} from '../index.js';

// @todo: Функция создания карточки

function createCardFunction(cardData, openImagePopup, onDeleteCard, onLikeCard) {
  const cardElement = cardTepmlate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const imageAtr = cardElement.querySelector('img');
  
  imageAtr.src = cardData.link;
  imageAtr.alt = cardData.alt;
  cardElement.querySelector('.card__title').textContent = cardData.name;


  cardImage.addEventListener('click', () => {
    openImagePopup(cardData);
  });
  deleteButton.addEventListener('click', onDeleteCard);
  likeButton.addEventListener('click', onLikeCard);

  return cardElement;
};

// @todo: Функция удаления карточки

function onDeleteCard(evt) {
  evt.target.closest('.card').remove();
};

// @todo: Функция лайка

function onLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export{ createCardFunction, onDeleteCard, onLikeCard };