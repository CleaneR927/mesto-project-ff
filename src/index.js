import './pages/index.css';
import { createCardFunction, onLikeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation, configForm } from './components/validation.js';
import { requestServerCards, requestServerMainData, editProfileSending, addCardSending, editAvatarSending, deleteCardSending} from './components/api.js';

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

function openDeleteCardPopup(data, cardElement, deleteCardPopup) {
  openModal(popupDeleteCard);
  deleteCardPopup(data, cardElement, deleteCardSending, closeModal);
}
// @todo: Функция удаления карточки

function deleteCardPopup(data, cardElement, deleteCard, closeModal) {
  popupDeleteCardButton.onclick = () => {
    requestServerCards() 
      .then(() => {
        cardElement.remove();
        closeModal(popupDeleteCard);
        deleteCard(data);
      })
      .catch((err) => {
        console.log('Не вышло получить данные и удалить карточку'+ err);
      });
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

function sendingEditImage(evt) {
  evt.preventDefault();
  renderLoading(true, profileEditImageButtonSave);
  editAvatarSending ({
    avatar: profileEditImageLink.value
  })
    .then((res) => {
      profileImage.style = `background-image: url(${res.avatar})`;
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

profilePopupFormEditImage.addEventListener('submit', sendingEditImage);

// Функция отправки формы редактирования профиля

function sendingEditProfile (evt) {
  evt.preventDefault();
  renderLoading(true, profileEditButtonSave);
  editProfileSending({
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(profilePopupEdit);
    })
    .catch((err) => {
    console.log('Не вышло обновить данные профиля'+ err);
  })
    .finally(() => {
    renderLoading(false, profileEditButtonSave);
  })
};

profilePopupFormEdit.addEventListener('submit', sendingEditProfile);

// Функция отправки формы создания карточки

function sendingAddCard (evt) {
  evt.preventDefault();
  renderLoading(true, profileAddButtonSave);
  addCardSending({
    name: profileAddCardName.value,
    link: profileAddCardLink.value
  })
    .then((res) => {
      const cardData = res;
      const userId = res.owner._id;
      const createCard = createCardFunction(cardData, openImagePopup, onLikeCard, deleteCardPopup, openDeleteCardPopup, userId);
      container.prepend(createCard);
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

profilePopupFormAdd.addEventListener('submit', sendingAddCard);

enableValidation(configForm);

Promise.all([
  requestServerMainData(), // Запрос личных данных пользователя
  requestServerCards() // Запрос карточек с сервера
])
  .then((values) => {
    profileTitle.textContent = values[0].name;
    profileDescription.textContent = values[0].about;
    profileImage.style = `background-image: url(${values[0].avatar})`;
    profileImage.alt = values[0].name;
    const userId = values[0]._id;
    values[1].forEach(function createArrCards(cardData) {
      const cardArr = createCardFunction(cardData, openImagePopup, onLikeCard, deleteCardPopup, openDeleteCardPopup, userId);
      const cardLikeCount = cardArr.querySelector('.card__like-count');
      cardLikeCount.textContent = cardData.likes.length;
      container.append(cardArr);
    })
  })
  .catch((err) => {
    console.log('Не вышло получить данные'+ err);
  });


