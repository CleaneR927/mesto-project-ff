// @todo: Темплейт карточки
  
  const cardTepm = document.querySelector('#card-template').content;

// @todo: DOM узлы

  const content = document.querySelector('.content');
  const cardList = content.querySelector('.places__list');

// @todo: Функция создания карточки

  initialCards.forEach(function(cardsArray) {
    const cardElem = cardTepm.querySelector('.card').cloneNode(true);
    
    cardElem.querySelector('.card__image').src = cardsArray.link;
    cardElem.querySelector('.card__title').textContent = cardsArray.name;

    cardList.append(cardElem);
  
    cardElem.querySelector('.card__delete-button').addEventListener('click', function() {
      cardDelFunc(cardElem);
    });

    return cardElem;
  });


// @todo: Функция удаления карточки

function cardDelFunc(cardElem) {
  cardElem.remove();
};

// @todo: Вывести карточки на страницу


