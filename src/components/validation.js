function showInputError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.inputErrorActive);
    errorElement.textContent = inputElement.validationMessage;
};

function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.inputErrorActive);
    errorElement.textContent = '';
};

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!isInputValid) {
    showInputError(inputElement, errorElement, config);
  } else {
    hideInputError(inputElement, errorElement, config);
  }
};

function toggleButtonState (buttonElement, buttonActive, config) {
  if(buttonActive) {
   buttonElement.disabled = false;
   buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
   buttonElement.disabled = 'disabled';
   buttonElement.classList.add(config.inactiveButtonClass);
  }
 };
 
function setEventListeners(formElement, config) {
   const inputList = formElement.querySelectorAll(config.inputSelector);
   const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
   toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
 
   [...inputList].forEach(function (inputElement) {
     inputElement.addEventListener('input', function () {
       toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
       checkInputValidity(inputElement, formElement, config);
     });
     
   })
   formElement.addEventListener('submit', function (evt) {
     evt.preventDefault();
   })
 };

export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  [...formList].forEach(function (formElement) {
    setEventListeners(formElement, config);
  });
};

// функция очистки валидации 

export function clearValidation(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  [...inputList].forEach(function (inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    hideInputError(inputElement, errorElement, config);
  });
};

// Конфигурационный объект форм

export const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active'
}

