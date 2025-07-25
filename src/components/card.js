import { deleteCard, likeCard, removeLike } from "./components/api.js";

export const createCard = (
  cardData,
  template,
  removeCard,
  likeCard,
  openImagePopup,
  currentUserId
) => {
  const clonedTemplate = template.cloneNode(true);
  const cardImage = clonedTemplate.querySelector(".card__image");
  const likeButton = clonedTemplate.querySelector(".card__like-button");
  const deleteButton = clonedTemplate.querySelector(".card__delete-button");
  const cardTitle = clonedTemplate.querySelector('.card__title');
  const likeCounter = clonedTemplate.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

if (cardData.owner && cardData.owner.id === currentUserId) {
  deleteButton.classList.add('card__delete-button_active');
} else {
  deleteButton.remove();
}
if (Array.isArray(cardData.likes) && cardData.likes.some(user => user.id === currentUserId)) {
  likeButton.classList.add('card__like-button_active');
} else {
    deleteButton.addEventListener("click", () =>
      removeCard(cardData._id, clonedTemplate)
    );
  }
  likeButton.addEventListener("click", () =>
    likeCard(cardData, likeButton, likeCounter)
  );

  cardImage.addEventListener("click", () =>
    openImagePopup({ link: cardData.link, name: cardData.name })
  );
  return clonedTemplate;
};

export function likeButtonClick(cardData, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? removeLike : likeCard;

  method(cardData._id)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    });
};

export function removeCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
};
