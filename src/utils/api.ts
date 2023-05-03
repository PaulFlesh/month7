import { IPatchUserForm } from '../constants/constants';
import {
  ingredientsUrl,
  userUrl
} from '../constants/constants';
import { getCookie } from './utils';

interface IOptions {
  method: 'POST' | 'PATCH' | 'GET';
  headers: {
    'Accept'?: string;
    'Content-type'?: string;
    'Authorization'?: string;
  };
  body?: string;
};

function checkResponse <T>(res: Response): Promise<T> | undefined {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}`);
  }
};

export function request(url: string, options: IOptions): any { // any
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
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    }
  })
};

export function patchUserFetch(data: IPatchUserForm) {
  return request(userUrl, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
};
