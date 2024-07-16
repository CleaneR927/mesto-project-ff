import { cardTepmlate} from './index.js';


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


  cardImage.addEventListener('click', openImagePopup);
  deleteButton.addEventListener('click', onDeleteCard);
  likeButton.addEventListener('click', onLikeCard);

  return cardElement;
};

export{ createCardFunction };