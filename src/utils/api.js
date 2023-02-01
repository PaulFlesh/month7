import {
  ingredientsUrl,
  userUrl
} from '../constants/constants';
import { getCookie } from './utils';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
};

export function request(url, options) {
  return fetch(url, options).then(checkResponse)
};

export function getDataFromServer() {
  return request(ingredientsUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })
};

export function getUserFetch() {
  return request(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
};

export function patchUserFetch(data) {
  return request(userUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
};
