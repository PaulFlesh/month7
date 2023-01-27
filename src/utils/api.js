import {
  ingredientsUrl,
  ordersUrl
} from '../constants/constants';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function getDataFromServer() {
  return fetch(ingredientsUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })
    .then(checkResponse);
}

export function postOrder(ingredients) {
  return fetch(ordersUrl, {
    method: 'POST',
    headers: {
      authorization: 'eeb10f4c-568d-4124-bc82-28113d2b839d',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ ingredients }),
  }).then(checkResponse)
}
