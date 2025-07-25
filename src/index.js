import "./pages/index.css";
// import { initialCards } from "./components/cards.js";
import { createCard, likeButtonClick, removeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getProfileInfo,
  getInitialCards,
  changeProfileInfo,
  addNewCard,
  changeProfileImage,
} from "./components/api.js";

const cardsDOMContainer = document.querySelector(".places__list");
const templateRoot = document.querySelector("#card-template");
const templateCardNode = templateRoot.content.querySelector(".card");
const editPopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = formEditProfile.querySelector('input[name="name"]');
const descriptionInput = formEditProfile.querySelector(
  'input[name="description"]'
);
const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formNewPlace.querySelector('input[name="place-name"]');
const placeLinkInput = formNewPlace.querySelector('input[name="link"]');
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");
const avatarEditButton = document.querySelector(".profile__image-edit-button");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.querySelector('form[name="avatar-update"]');
const avatarLinkInput = avatarForm.querySelector('input[name="avatar-link"]');
const profileImage = document.querySelector(".profile__image");
let currentUserId = null;
const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const createCardList = (
  data,
  template,
  removeCard,
  likeCard,
  openImagePopup
) => {
  return data.map((cardData) =>
    createCard(cardData, template, removeCard, likeCard, openImagePopup)
  );
};

enableValidation(formValidationConfig);

function editProfileAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarLink = avatarLinkInput.value;
  const submitButton = evt.submitter;
  const originalButtonText = submitButton.textContent;
  renderLoading(true, submitButton, originalButtonText);

  changeProfileImage(avatarLink)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, originalButtonText);
    });
}

avatarForm.addEventListener ("submit", editProfileAvatarSubmit);
avatarEditButton.addEventListener ("click", () => {
  avatarForm.reset ();
  clearValidation (avatarForm, formValidationConfig);
  openPopup(avatarPopup);
});


function openImagePopup({ link, name }) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalButtonText = submitButton.textContent;
  renderLoading(true, submitButton, originalButtonText);

  const name = nameInput.value;
  const about = descriptionInput.value;

  changeProfileInfo(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, originalButtonText);
    });
}

function newCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const originalButtonText = submitButton.textContent;
  renderLoading(true, submitButton, originalButtonText);

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  addNewCard(name, link)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        templateCardNode,
        removeCard,
        likeButtonClick,
        openImagePopup,
        currentUserId
      );
      cardsDOMContainer.prepend(cardElement);
      closePopup(addCardPopup);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, originalButtonText);
    });
}

function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, formValidationConfig);
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, formValidationConfig);
  openPopup(addCardPopup);
});

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    const cardElements = createCardList(
      templateCardNode,
      removeCard,
      likeButtonClick,
      openImagePopup,
      currentUserId
    );
    cardsDOMContainer.append(...cardElements);
  })
  .catch((err) => {
    console.error(`Ошибка при инициализации данных:${err}`);
  });

formEditProfile.addEventListener("submit", editProfileFormSubmit);
formNewPlace.addEventListener("submit", newCardFormSubmit);
