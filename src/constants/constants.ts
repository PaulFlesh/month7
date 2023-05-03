import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '..';
import { TUserActions } from '../services/actions/auth';
import { TCartActions } from '../services/actions/cart';
import { TMenuActions } from '../services/actions/menu';
import { TOrderActions } from '../services/actions/order';
import { TWsActions } from '../services/actions/wsFeed';
import { TWsProfileActions } from '../services/actions/wsProfileOrders';

const apiUrl: string = "https://norma.nomoreparties.space/api";
export const ingredientsUrl: string = apiUrl + "/ingredients";
export const ordersUrl: string = apiUrl + "/orders";
export const registerUrl: string = apiUrl + "/auth/register";
export const userUrl: string = apiUrl + "/auth/user";
export const loginUrl: string = apiUrl + "/auth/login";
export const logoutUrl: string = apiUrl + "/auth/logout";
export const passwordRestoreUrl: string = apiUrl + "/password-reset";
export const passwordResetUrl: string = apiUrl + "/password-reset/reset";

export const accessTokenLifetime: number = 1200;
export const refreshTokenLifetime: number = 2400;

export const wsAllUrl: string = "wss://norma.nomoreparties.space/orders/all";
export const wsProfileOrdersUrl: string = "wss://norma.nomoreparties.space/orders";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number;
  key?: string;
};

export interface IUser {
  email?: string;
  name?: string;
};

export interface IOrder {
  ingredients: Array<string>;
  name?: string;
  _id: string;
  status: 'done' | 'pending' | 'created' | 'canceled';
  number: number;
  createdAt: string;
  updatedAt: string;
};

export interface IConstructorOrder {
  ingredients?: string[];
  number?: string;
};

export type TFilter = {
  done: number[];
  pending: number[];
};

export interface IRegisterForm {
  email: string;
  password: string;
  name: string;
};

export interface ILoginForm {
  email: string;
  password: string;
};

export interface IPatchUserForm {
  name: string;
  email: string;
  password: string;
};

export interface IForgotPasswordForm {
  email: string;
};

export interface IResetPasswordForm {
  email: string;
  password: string;
};

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TUserActions
  | TCartActions
  | TMenuActions
  | TOrderActions
  | TWsActions
  | TWsProfileActions;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

