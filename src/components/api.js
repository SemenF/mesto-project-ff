const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: 'c22cc9bc-a7b5-406a-9c06-4c857fdcf451',
    'Content-Type': 'application/json'
  }
};

const getResponseData = (res) => {
    if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
};

export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponseData);
};

export const changeProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
};

export const addNewCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
};

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
};

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
};

export const changeProfileImage = (newProfileImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newProfileImage.avatar
        })
    })
    .then((res) => {
        return getResponseData(res);
    })
    .then((res) => {
        console.log(res);
        return res;
    })
};