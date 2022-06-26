export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl,
    this._headers = options.headers
  }

  _responseRenderer(result, resultAlert) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._responseRenderer(res, 'Ошибка при загрузке карточек'));
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._responseRenderer(res, 'Ошибка при добавление новой карточки'));
  }

  removeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data.id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return {
            card: data.card
          };
        }

        return Promise.reject(`Ошибка при удалении карточки: ${result.status}`);
      });
  }

  likeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data.id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._responseRenderer(res, 'Ошибка при добавлении в избранное'));
  }

  unlikeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data.id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._responseRenderer(res, 'Ошибка при удалении из избранного'));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._responseRenderer(res, 'Ошибка при получении данных пользователя'));
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._responseRenderer(res, 'Ошибка при обновлении данных пользователя'));
  }

  setUserPic(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(res => this._responseRenderer(res, 'Ошибка при обновлении изображения пользователя'));
  }
}
