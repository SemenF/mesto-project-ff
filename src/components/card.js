export const createCard = (cardData, template, removeCard, likeCard, openImagePopup ) => {
    const clonedTemplate = template.cloneNode(true);
    const cardImage = clonedTemplate.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    clonedTemplate.querySelector('.card__title').textContent = cardData.name;

   const deleteButton = clonedTemplate.querySelector('.card__delete-button');
   deleteButton.addEventListener('click', removeCard);

   const likeButton = clonedTemplate.querySelector('.card__like-button');
   likeButton.addEventListener('click', likeCard);

   cardImage.addEventListener('click', () => openImagePopup(cardData));

   return clonedTemplate;
};

export const createCardList = (data, template, removeCard, likeCard, openImagePopup) =>
    data.map(cardData => createCard(cardData, template, removeCard, likeCard, openImagePopup));


export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function removeCard(evt) {
  const cardElement = evt.target.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
}