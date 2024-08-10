const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-19';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Запрос массива карточек от сервера

export function requestServerCards() {
  return fetch(baseUrl + '/cards', {
    method: 'GET',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9'
    }
  })
    .then(res => handleResponse(res))
}

// Запрос свои данных от сервера

export function requestServerMainData() {
  return fetch(baseUrl + '/users/me', {
    method: 'GET',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9'
    }
  })
    .then(res => handleResponse(res))
}

// Отправка данных профиля на сервер 

export function editProfileSending(data) {
  return fetch(baseUrl + `/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(res => handleResponse(res))
}

// Отправка новой карточки на сервер

export function addCardSending(data) {
  return fetch(baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(res => handleResponse(res))
}

// Удаление карточки с сервера

export function deleteCardSending(data) {
  return fetch(baseUrl + `/cards/${data._id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9'
    }
  })
    .then(res => handleResponse(res))
}

// Отправка лайка на сервер 

export function addLikeSending(data) {
  return fetch(baseUrl + `/cards/${data._id}/likes`, {
    method: 'PUT',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9'
    }
  })
    .then(res => handleResponse(res))
}

// Удаление лайка с сервера

export function deleteLikeSending(data) {
  return fetch(baseUrl + `/cards/${data._id}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9'
    }
  })
    .then(res => handleResponse(res))
}

// Загрузка аватара на сервер

export function editAvatarSending(data) {
  return fetch(baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'bffcd4f6-b8de-45c0-9c98-c3c9144236d9',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      avatar: data.avatar
    })
  })
    .then(res => handleResponse(res))
}



