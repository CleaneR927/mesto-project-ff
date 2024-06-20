// @todo: Темплейт карточки
  
  const cardTepm = document.querySelector('#card-template').content;

// @todo: DOM узлы

  const content = document.querySelector('.content');
  const container = content.querySelector('.places__list');

// @todo: Функция создания карточки

function createCardFunc(element) {
  const cardElem = cardTepm.querySelector('.card').cloneNode(true);
  const imageAtr = cardElem.querySelector('img');
  
  imageAtr.src = element.link;
  imageAtr.alt = element.alt;
  cardElem.querySelector('.card__title').textContent = element.name;

  cardElem.querySelector('.card__delete-button').addEventListener('click', function() {
    delCardFunc(cardElem);
  });

  return cardElem;
};

// @todo: Функция удаления карточки

function delCardFunc(cardElem) {
  cardElem.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function createArrCards(element) {
  const cardArr = createCardFunc(element);
  container.append(cardArr);
});