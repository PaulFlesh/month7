import { AppDispatch, IIngredient } from "../../constants/constants";
import { getDataFromServer } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const SET_BUN: 'SET_BUN' = 'SET_BUN';
export const OPEN_INGREDIENT_DETAILS: 'OPEN_INGREDIENT_DETAILS' = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS: 'CLOSE_INGREDIENT_DETAILS' = 'CLOSE_INGREDIENT_DETAILS';

export const INCREASE_COUNTER: 'INCREASE_COUNTER' = 'INCREASE_COUNTER';
export const DECREASE_COUNTER: 'DECREASE_COUNTER' = 'DECREASE_COUNTER';

export interface IGetMenuRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
  menuRequest: boolean;
};

export interface IGetMenuSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  menuRequest: boolean;
  items: Array<IIngredient>;
};

export interface IGetMenuFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  menuRequest: boolean;
  menuFailed: boolean;
};

export interface ISetBunAction {
  readonly type: typeof SET_BUN;
  id: string;
};

export interface IOpenDetailsAction {
  readonly type: typeof OPEN_INGREDIENT_DETAILS;
  ingredient: IIngredient;
};

export interface ICloseDetailsAction {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS;
  ingredientDetailsModal: null;
};

export interface IIncreaseCounterAction {
  readonly type: typeof INCREASE_COUNTER;
  items: Array<IIngredient>;
};

export interface IDecreaseCounterAction {
  readonly type: typeof DECREASE_COUNTER;
  items: Array<IIngredient>;
};

export type TMenuActions =
  | IGetMenuRequestAction
  | IGetMenuSuccessAction
  | IGetMenuFailedAction
  | ISetBunAction
  | IOpenDetailsAction
  | ICloseDetailsAction
  | IIncreaseCounterAction
  | IDecreaseCounterAction;

type TMenuFetch = {
  success: boolean;
  data: Array<IIngredient>;
};

export const getMenu = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  return getDataFromServer()
    .then((res: TMenuFetch) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        items: res.data
      })
    })
    .catch((err: string) => {
      dispatch({ type: GET_INGREDIENTS_FAILED });
      console.log(err);
    })
};
