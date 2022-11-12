const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

export default function getDataFromServer() {
  return fetch(apiUrl)
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};
