import {
  registerUrl,
  userUrl,
  loginUrl,
  logoutUrl,
  passwordRestoreUrl,
  passwordResetUrl,
  accessTokenLifetime,
  refreshTokenLifetime
} from '../../constants/constants';
import { getCookie, setCookie, deleteCookie } from '../../utils/utils';
import { checkResponse } from '../../utils/api';

export const USER_AUTHORIZED = 'USER_AUTHORIZED';
export const STORE_USER = 'STORE_USER';
export const STORE_PASSWORD = 'STORE_PASSWORD';
export const CLEAR_USER = 'CLEAR_USER';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAIL = 'PATCH_USER_FAIL';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const RESTORE_PASS_REQUEST = 'RESTORE_PASS_REQUEST';
export const RESTORE_PASS_SUCCESS = 'RESTORE_PASS_SUCCESS';
export const RESTORE_PASS_FAIL = 'RESTORE_PASS_FAIL';

export const RESET_PASS_REQUEST = 'RESET_PASS_REQUEST';
export const RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAIL = 'RESET_PASS_FAIL';

export function registerProfile(data) {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(checkResponse)
      .then(/*data*/() => {
        dispatch({ type: REGISTER_SUCCESS });
        /*
        setCookie(
          'accessToken',
          data.accessToken.split('Bearer ')[1],
          { expires: accessTokenLifetime }
        );
        setCookie(
          'refreshToken',
          data.refreshToken,
          { expires: refreshTokenLifetime }
        )*/
      })
      .catch(() => {
        dispatch({ type: REGISTER_FAIL })
      })
  }
}

export function login(data) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(checkResponse)
      .then(data => {
        dispatch({ type: LOGIN_SUCCESS });
        setCookie(
          'accessToken',
          data.accessToken.split('Bearer ')[1],
          { expires: accessTokenLifetime }
        );
        setCookie(
          'refreshToken',
          data.refreshToken,
          { expires: refreshTokenLifetime }
        );
        dispatch({ type: STORE_USER, user: data.user });
        dispatch({ type: USER_AUTHORIZED, isAuthorized: true })
      })
      .catch(() => dispatch({ type: LOGIN_FAIL }))
  }
}

export async function getUserFetch() {
  return await fetch(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
    .then(checkResponse)
    .catch(error => console.log(error))
};

export function getUser() {
  return async function (dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    const res = await getUserFetch();
    if (res?.success) {
      dispatch({ type: GET_USER_SUCCESS });
      dispatch({ type: STORE_USER, user: res.user });
      dispatch({ type: USER_AUTHORIZED, isAuthorized: true })
    } else {
      dispatch({ type: GET_USER_FAIL })
    }
  }
}

export async function patchUserFetch(data) {
  return await fetch(userUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
    .then(checkResponse)
    .catch(error => console.log(error))
}

export function patchUser(data) {
  return async function (dispatch) {
    dispatch({ type: PATCH_USER_REQUEST });
    const res = await patchUserFetch(data);
    if (res?.success) {
      dispatch({ type: PATCH_USER_SUCCESS });
      dispatch({
        type: STORE_USER,
        user: res.user
      })
    } else {
      dispatch({ type: PATCH_USER_FAIL })
    }
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });

    fetch(logoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: getCookie('refreshToken') })
    })
      .then(checkResponse)
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch({
          type: USER_AUTHORIZED,
          isAuthorized: false
        });
        dispatch({ type: CLEAR_USER });
      })
      .catch(() => dispatch({ type: LOGOUT_FAIL }))
  }
}

export function restorePassword(data) {
  return function (dispatch) {
    dispatch({ type: RESTORE_PASS_REQUEST });
    fetch(passwordRestoreUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(checkResponse)
      .then(() => dispatch({ type: RESTORE_PASS_SUCCESS }))
      .catch(() => dispatch({ type: RESTORE_PASS_FAIL }));
  }
}

export function resetPassword(data) {
  return function (dispatch) {
    dispatch({ type: RESET_PASS_REQUEST });
    fetch(passwordResetUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(checkResponse)
      .then(() => dispatch({ type: RESET_PASS_SUCCESS }))
      .catch(() => dispatch({ type: RESET_PASS_FAIL }));
  }
}
