export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl,
    this._token = options.token
  }

  _responseRenderer(result, resultAlert) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._responseRenderer(res, 'Ошибка при загрузке карточек'));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._responseRenderer(res, 'Ошибка при получении данных пользователя'));
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._responseRenderer(res, 'Ошибка при обновлении данных пользователя'));
  }
}
