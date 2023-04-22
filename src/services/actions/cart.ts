import { IIngredient } from "../../constants/constants";

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENTS: 'ADD_INGREDIENTS' = 'ADD_INGREDIENTS';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const CLEAR_CART: 'CLEAR_CART' = 'CLEAR_CART';

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  bun: null | IIngredient;
};

export interface IAddIngredientsAction {
  readonly type: typeof ADD_INGREDIENTS;
  ingredients: Array<IIngredient>;
  item: any;
};

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  ingredients: Array<IIngredient>;
};

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  ingredients: Array<IIngredient>;
  item: number;
};

export interface IClearCartAction {
  readonly type: typeof CLEAR_CART;
  bun: null | IIngredient;
  ingredients: Array<IIngredient>;
};

export type TCartActions = 
  | IAddBunAction
  | IAddIngredientsAction
  | IMoveIngredientAction
  | IDeleteIngredientAction
  | IClearCartAction;
