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


  if (cardData.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_active");
  }

  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
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

export const createCardList = (
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
