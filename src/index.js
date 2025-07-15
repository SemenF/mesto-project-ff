import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, createCardList } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { removeCard, likeCard } from "./components/card.js";

const cardsDOMContainer = document.querySelector(".places__list");
const templateRoot = document.querySelector("#card-template");
const templateCardNode = templateRoot.content.querySelector(".card");
const cardNodes = createCardList(
  initialCards,
  templateCardNode,
  removeCard,
  likeCard,
  openImagePopup
);
cardsDOMContainer.append(...cardNodes);

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
const popups = document.querySelectorAll(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

function openImagePopup({ link, name }) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
}

function newCardFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const newCard = createCard(
    { name, link },
    templateCardNode,
    removeCard,
    likeCard
  );

  cardsDOMContainer.prepend(newCard);

  closePopup(addCardPopup);
  formNewPlace.reset();
}

formEditProfile.addEventListener("submit", editProfileFormSubmit);
formNewPlace.addEventListener("submit", newCardFormSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => openPopup(addCardPopup));
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});
