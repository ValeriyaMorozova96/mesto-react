export class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }
    _getServerReply(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getMyInfo() {
        return fetch(`${this._url}/users/me`,
            {
                method: 'GET',
                headers: this._headers
            })
            .then(this._getServerReply)
    }
    getServerCards() {
        return fetch(`${this._url}/cards`,
            {
                method: 'GET',
                headers: this._headers
            })
            .then(this._getServerReply)
    }
    changeProfileData(data) {
        return fetch(`${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({ name: data.name, about: data.about })
            })
            .then(this._getServerReply)
    }
    addNewCard(newCardData) {
        return fetch(`${this._url}/cards`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({ name: newCardData.name, link: newCardData.link })
            })
            .then(this._getServerReply)
    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`,
            {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._getServerReply)
    }
    putLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`,
            {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._getServerReply)
    }
}

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-61",
    headers: {
        "authorization": "9512f6eb-2c3f-4ba0-932f-a124d815c2ac",
        "Content-Type": "application/json",
    }
});
export default api;