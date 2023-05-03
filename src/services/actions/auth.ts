import {
  registerUrl,
  loginUrl,
  logoutUrl,
  passwordRestoreUrl,
  passwordResetUrl,
  accessTokenLifetime,
  refreshTokenLifetime,
  IRegisterForm,
  ILoginForm,
  IPatchUserForm,
  IForgotPasswordForm,
  IResetPasswordForm,
  IUser
} from '../../constants/constants';
import { getCookie, setCookie, deleteCookie } from '../../utils/utils';
import { request, getUserFetch, patchUserFetch } from '../../utils/api';
import { AppDispatch } from '../../constants/constants';

export const USER_AUTHORIZED: 'USER_AUTHORIZED' = 'USER_AUTHORIZED';
export const STORE_USER: 'STORE_USER' = 'STORE_USER';
export const STORE_PASSWORD: 'STORE_PASSWORD' = 'STORE_PASSWORD';
export const CLEAR_USER: 'CLEAR_USER' = 'CLEAR_USER';
export const CLEAR_LOGOUT_STATE: 'CLEAR_LOGOUT_STATE' = 'CLEAR_LOGOUT_STATE';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAIL: 'GET_USER_FAIL' = 'GET_USER_FAIL';

export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAIL: 'PATCH_USER_FAIL' = 'PATCH_USER_FAIL';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAIL: 'REGISTER_FAIL' = 'REGISTER_FAIL';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAIL: 'LOGIN_FAIL' = 'LOGIN_FAIL';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL: 'LOGOUT_FAIL' = 'LOGOUT_FAIL';

export const RESTORE_PASS_REQUEST: 'RESTORE_PASS_REQUEST' = 'RESTORE_PASS_REQUEST';
export const RESTORE_PASS_SUCCESS: 'RESTORE_PASS_SUCCESS' = 'RESTORE_PASS_SUCCESS';
export const RESTORE_PASS_FAIL: 'RESTORE_PASS_FAIL' = 'RESTORE_PASS_FAIL';

export const RESET_PASS_REQUEST: 'RESET_PASS_REQUEST' = 'RESET_PASS_REQUEST';
export const RESET_PASS_SUCCESS: 'RESET_PASS_SUCCESS' = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAIL: 'RESET_PASS_FAIL' = 'RESET_PASS_FAIL';

export interface IUserAuthorizedAction {
  readonly type: typeof USER_AUTHORIZED;
  isAuthorized: boolean;
};

export interface IStoreUserAction {
  readonly type: typeof STORE_USER;
  user: IUser;
};

export interface IStorePasswordAction {
  readonly type: typeof STORE_PASSWORD;
  password: string;
};

export interface IClearUserAction {
  readonly type: typeof CLEAR_USER;
  user: IUser;
};

export interface IClearLogoutStateAction {
  readonly type: typeof CLEAR_LOGOUT_STATE;
  logoutSuccess: boolean;
};

export interface IPatchUserRequestAction {
  readonly type: typeof PATCH_USER_REQUEST;
  patchUserRequest: boolean;
  patchUserSuccess: boolean;
  patchUserFail: boolean;
};

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  patchUserRequest: boolean;
  patchUserSuccess: boolean;
  patchUserFail: boolean;
};

export interface IPatchUserFailAction {
  readonly type: typeof PATCH_USER_FAIL;
  patchUserRequest: boolean;
  patchUserSuccess: boolean;
  patchUserFail: boolean;
};

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;
};

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;
};

export interface IRegisterFailAction {
  readonly type: typeof REGISTER_FAIL;
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;
};

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
  loginRequest: boolean;
};

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;
};

export interface ILoginFailAction {
  readonly type: typeof LOGIN_FAIL;
  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;
};

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
  logoutRequest: boolean;
};

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
  isAuthorized: boolean;
  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutFailed: boolean;
};

export interface ILogoutFailAction {
  readonly type: typeof LOGOUT_FAIL;
  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutFailed: boolean;
};

export interface IRestorePassRequestAction {
  readonly type: typeof RESTORE_PASS_REQUEST;
  restoreRequest: boolean;
};

export interface IRestorePassSuccessAction {
  readonly type: typeof RESTORE_PASS_SUCCESS;
  restoreRequest: boolean;
  restoreSuccess: boolean;
  restoreFailed: boolean;
};

export interface IRestorePassFailAction {
  readonly type: typeof RESTORE_PASS_FAIL;
  restoreRequest: boolean;
  restoreSuccess: boolean;
  restoreFailed: boolean;
};

export interface IResetPassRequestAction {
  readonly type: typeof RESET_PASS_REQUEST;
  resetRequest: boolean;
};

export interface IResetPassSuccessAction {
  readonly type: typeof RESET_PASS_SUCCESS;
  resetRequest: boolean;
  resetSuccess: boolean;
  resetFailed: boolean;
};

export interface IResetPassFailAction {
  readonly type: typeof RESET_PASS_FAIL;
  resetRequest: boolean;
  resetSuccess: boolean;
  resetFailed: boolean;
};

export type TUserActions =
  | IUserAuthorizedAction
  | IStoreUserAction
  | IStorePasswordAction
  | IStorePasswordAction
  | IClearUserAction
  | IClearLogoutStateAction
  | IPatchUserRequestAction
  | IPatchUserSuccessAction
  | IPatchUserFailAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailAction
  | IRestorePassRequestAction
  | IRestorePassSuccessAction
  | IRestorePassFailAction
  | IResetPassRequestAction
  | IResetPassSuccessAction
  | IResetPassFailAction;

type TGetUserFetch = {
  success: boolean;
  user: IUser;
};

type TLoginFetch = TGetUserFetch & {
  accessToken: string;
  refreshToken: string;
}

export const registerProfile = (data: IRegisterForm) => (dispatch: AppDispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return request(registerUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(() => dispatch({ type: REGISTER_SUCCESS }))
    .catch(() => dispatch({ type: REGISTER_FAIL }))
};

export const login = (data: ILoginForm) => (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return request(loginUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((data: TLoginFetch) => {
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
};

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  return getUserFetch()
    .then((res: TGetUserFetch) => {
      if (res?.success) {
        dispatch({ type: GET_USER_SUCCESS });
        dispatch({ type: STORE_USER, user: res.user });
        dispatch({ type: USER_AUTHORIZED, isAuthorized: true })
      } else {
        dispatch({ type: GET_USER_FAIL })
      }
    })
    .catch(() => dispatch({ type: GET_USER_FAIL }))
};

export const patchUser = (data: IPatchUserForm) => (dispatch: AppDispatch) => {
  dispatch({ type: PATCH_USER_REQUEST });
  return patchUserFetch(data)
    .then((res: TGetUserFetch) => {
      if (res?.success) {
        dispatch({ type: PATCH_USER_SUCCESS });
        dispatch({
          type: STORE_USER,
          user: res.user
        })
      } else {
        dispatch({ type: PATCH_USER_FAIL })
      }
    })
    .catch(() => dispatch({ type: PATCH_USER_FAIL }))
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  return request(logoutUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ token: getCookie('refreshToken') })
  })
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
};

export const restorePassword = (data: IForgotPasswordForm) => (dispatch: AppDispatch) => {
  dispatch({ type: RESTORE_PASS_REQUEST });
  return request(passwordRestoreUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(() => dispatch({ type: RESTORE_PASS_SUCCESS }))
    .catch(() => dispatch({ type: RESTORE_PASS_FAIL }));
};

export const resetPassword = (data: IResetPasswordForm) => (dispatch: AppDispatch) => {
  dispatch({ type: RESET_PASS_REQUEST });
  return request(passwordResetUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(() => dispatch({ type: RESET_PASS_SUCCESS }))
    .catch(() => dispatch({ type: RESET_PASS_FAIL }));
};
