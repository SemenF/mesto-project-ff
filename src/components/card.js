import { deleteCard, putLikeCard, removeLike } from "./api";


export function createCard(cardData, { removeCard, likeCard, openImagePopup, currentUserId } ){
  const templateRoot = document.querySelector("#card-template").content;
  const clonedTemplate = templateRoot.querySelector('.places__item').cloneNode(true);

  const cardImage = clonedTemplate.querySelector(".card__image");
  const likeButton = clonedTemplate.querySelector(".card__like-button");
  const deleteButton = clonedTemplate.querySelector(".card__delete-button");
  const likeCounter = clonedTemplate.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  clonedTemplate.querySelector('.card__title').textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

if (cardData.owner && cardData.owner._id === currentUserId) {
  deleteButton.classList.add('card__delete-button_active');
  deleteButton.addEventListener("click", () => removeCard(cardData._id, clonedTemplate));
} else {
  deleteButton.remove();
}
if (Array.isArray(cardData.likes) && cardData.likes.some(user => user._id === currentUserId)) {
  likeButton.classList.add('card__like-button_active');
} 

likeButton.addEventListener("click", () => likeCard(likeButton, cardData, likeCounter));
cardImage.addEventListener("click", () => openImagePopup(cardData));

return clonedTemplate;
}

export function likeCard(likeButton, cardData, likeCounter) {
  const cardId = cardData._id;

  if (!likeButton.classList.contains('card__like-button_active')) {
    putLikeCard(cardId)
      .then(updatedCard => {
        likeButton.classList.add('card__like-button_active');
        likeCounter.textContent = updatedCard.likes.length;
        // Обновляем локальные данные карточки, если нужно
        cardData.likes = updatedCard.likes;
      })
      .catch(err => {
        console.error(`Ошибка при постановке лайка: ${err}`);
      });
  } else {
    removeLike(cardId)
      .then(updatedCard => {
        likeButton.classList.remove('card__like-button_active');
        likeCounter.textContent = updatedCard.likes.length;
        cardData.likes = updatedCard.likes;
      })
      .catch(err => {
        console.error(`Ошибка при снятии лайка: ${err}`);
      });
  }
}

export function removeCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    });
}