class Api {
  constructor ({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }

  editAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "avatar": avatar
      })
    })
    .then(res => this._getResponseData(res));  
  }

  editProfile({name, about}, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "name": name, 
        "about": about
      })
    })
    .then(res => this._getResponseData(res)); 
  }


  addNewCard({name, link}, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._getResponseData(res));
  }

  addLikeCard(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }

  removeLikeCard(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }

  handleDeleteCard(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._getResponseData(res));
  }
};

const api = new Api({
  //baseUrl: 'http://localhost:4000',
  baseUrl: 'https://api.ivanyurlov.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
