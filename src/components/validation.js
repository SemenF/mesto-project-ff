function showInputError(formElement, inputElement,config, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(config.inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}


function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      const errorMessage = inputElement.dataset.errorMessage;
      showInputError(formElement, inputElement, config, errorMessage);
    } else {
      showInputError(
        formElement,
        inputElement,
        config,
        inputElement.validationMessage
      );
    }
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function disableButton (buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

function enableButton (buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

function toggleButtonState (inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, config);
  } else {
      enableButton(buttonElement, config);
  }
}


function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    }) 
}

export function clearValidation (formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
    })
    disableButton(buttonElement, config);
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};