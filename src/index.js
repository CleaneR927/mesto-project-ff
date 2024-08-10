import './pages/index.css';
import { createCardFunction, onLikeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation, configForm } from './components/validation.js';
import { requestServerCards, requestServerMainData, profileEditSending, addCardSending, avatarEditSending, deleteCard} from './components/api.js';

export const cardTepmlate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const container = content.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageClose = popupTypeImage.querySelector('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');
const profilePopupEdit = document.querySelector('.popup_type_edit');
const profileEditButtonClose = profilePopupEdit.querySelector('.popup__close');
const profilePopupFormEdit = profilePopupEdit.querySelector('.popup__form');
const profileNameInput = profilePopupFormEdit.querySelector('.popup__input_type_name');
const profileDescriptionInput = profilePopupFormEdit.querySelector('.popup__input_type_description');
const profileEditButtonSave = profilePopupEdit.querySelector('.popup__button');
const profilePopupAdd = document.querySelector('.popup_type_new-card');
const profileAddButtonSave = profilePopupAdd.querySelector('.popup__button');
const profileAddButtonClose = profilePopupAdd.querySelector('.popup__close');
const profilePopupFormAdd = profilePopupAdd.querySelector('.popup__form');
const profileAddCardName = profilePopupFormAdd.querySelector('.popup__input_type_card-name');
const profileAddCardLink = profilePopupFormAdd.querySelector('.popup__input_type_url');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profileButtonAdd = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const popupDeleteCard = document.querySelector('.popup_delete_card');
const popupDeleteCardButton = popupDeleteCard.querySelector('.popup__button');
const popupDeleteCardClose = popupDeleteCard.querySelector('.popup__close');
const popupTypeEditImage = document.querySelector('.popup_type_edit-image');
const popupEditImageClose = popupTypeEditImage.querySelector('.popup__close');
const profilePopupFormEditImage = popupTypeEditImage.querySelector('.popup__form');
const profileEditImageLink = profilePopupFormEditImage.querySelector('.popup__input_type_url');
const profileEditImageButtonSave = profilePopupFormEditImage.querySelector('.popup__button');

// Функция замены текста кнопки отправки запроса на сервер

function renderLoading (isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
} 

// Функция открытия окна редактирования аватарки 

profileImage.addEventListener('click', () => {
  openModal(popupTypeEditImage);
  clearValidation(popupTypeEditImage, configForm);
});

// Функция открытия изображения в модальном окне

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.alt;
  popupTypeImageCaption.textContent = cardData.name;
  openModal(popupTypeImage);
};

// Функция открытия окна удаления карточки

function deleteCardPopup(data, cardElement, onDeleteCard) {
  openModal(popupDeleteCard);
  onDeleteCard(data, cardElement, deleteCard, closeModal);
}

// @todo: Функция удаления карточки

function onDeleteCard(data, cardElement, deleteCard, closeModal) {
  popupDeleteCardButton.onclick = () => {
    cardElement.remove();
    requestServerCards() 
      .then(() => {
        deleteCard(data);
      })
      .catch((err) => {
        console.log('Не вышло получить данные и удалить карточку'+ err);
      });
    closeModal(popupDeleteCard);
  }
};

// Обработчик открытия окна редактирования профиля

profileButtonEdit.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopupEdit);
  clearValidation(profilePopupEdit, configForm);
});

// Обработчик открытия окна добавление карточки

profileButtonAdd.addEventListener('click', () => {
  profilePopupFormAdd.reset();
  openModal(profilePopupAdd);
  clearValidation(profilePopupAdd, configForm);
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

popupDeleteCardClose.addEventListener('click', () => {
  closeModal(popupDeleteCard);
});

popupEditImageClose.addEventListener('click', () => {
  closeModal(popupTypeEditImage);
})

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

popupDeleteCard.addEventListener('mousedown', (evt) => {
  if (evt.target === popupDeleteCard) {
    closeModal(popupDeleteCard);
  }
});

popupTypeEditImage.addEventListener('mousedown', (evt) => {
  if (evt.target === popupTypeEditImage) {
    closeModal(popupTypeEditImage);
  }
});

// Функция отправки нового изображения профиля 

function profilePopupFormEditImageSending (evt) {
  evt.preventDefault();
  requestServerMainData() 
    .then(() => {
      renderLoading(true, profileEditButtonSave);
    })
    .catch((err) => {
      console.log('Не вышло получить данные для сохранения'+ err);
    })
  profileImage.style = `background-image: url(${profileEditImageLink.value})`;
  avatarEditSending ({
    avatar: profileEditImageLink.value
  })
    .then(() => {
      closeModal(popupTypeEditImage);
      profilePopupFormEditImage.reset();
    })
    .catch((err) => {
    console.log('Не вышло получить данные'+ err);
    })
    .finally(() => {
    renderLoading(false, profileEditImageButtonSave);
    });
};

profilePopupFormEditImage.addEventListener('submit', profilePopupFormEditImageSending);

// Функция отправки формы редактирования профиля

function profilePopupFormEditSending (evt) {
  evt.preventDefault();
  requestServerMainData() 
    .then(() => {
      renderLoading(true, profileEditButtonSave);
    })
    .catch((err) => {
      console.log('Не вышло получить данные для сохранения'+ err);
    })
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditSending({
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  })
    .then(() => {
      closeModal(profilePopupEdit);
    })
    .catch((err) => {
    console.log('Не вышло обновить данные профиля'+ err);
  })
    .finally(() => {
    renderLoading(false, profileEditButtonSave);
  })
};

profilePopupFormEdit.addEventListener('submit', profilePopupFormEditSending);

// Функция отправки формы создания карточки

function profilePopupFormAddSending (evt) {
  evt.preventDefault();
  requestServerCards() 
    .then(() => {
      renderLoading(true, profileEditButtonSave);
    })
    .catch((err) => {
      console.log('Не вышло получить данные для сохранения'+ err);
    })
  const cardArr = createCardFunction({
    name: profileAddCardName.value,
    link: profileAddCardLink.value
  }, openImagePopup, onLikeCard, deleteCardPopup, onDeleteCard);
  addCardSending({
    name: profileAddCardName.value,
    link: profileAddCardLink.value
  })
    .then(() => {
      container.prepend(cardArr);
      closeModal(profilePopupAdd);
      profilePopupFormAdd.reset();
    })
    .catch((err) => {
    console.log('Не вышло получить данные'+ err);
    })
    .finally(() => {
    renderLoading(false, profileAddButtonSave);
    });
};

profilePopupFormAdd.addEventListener('submit', profilePopupFormAddSending);

enableValidation(configForm);

Promise.all([
  requestServerMainData() // Запрос личных данных пользователя
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      profileImage.style = `background-image: url(${res.avatar})`;
      profileImage.alt = res.name;
      const userId = res._id;
      return userId;
    }) 
    .catch((err) => {
      console.log('Не вышло получить данные о пользователе'+ err);
    }), 
  requestServerCards() // Запрос карточек с сервера
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('Не вышло получить данные о карточках:'+ err);
    })
])
  .then((values) => {
    values[1].forEach(function createArrCards(cardData) {
      const userId = values[0];
      const cardArr = createCardFunction(cardData, openImagePopup, onLikeCard, deleteCardPopup, onDeleteCard, userId);
      const cardLikeCount = cardArr.querySelector('.card__like-count');
      cardLikeCount.textContent = cardData.likes.length;
      container.append(cardArr);
    })
  })
  .catch((err) => {
    console.log('Не вышло получить данные'+ err);
  });


