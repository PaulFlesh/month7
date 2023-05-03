import {
  ADD_BUN,
  ADD_INGREDIENTS,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  CLEAR_CART,
  TCartActions
} from "../actions/cart";
import { IIngredient } from "../../constants/constants";

type TInitialState = {
  bun: null | IIngredient;
  ingredients: Array<IIngredient>;
};

const initialState: TInitialState = {
  bun: null,
  ingredients: []
};

export const cartReducer = (state = initialState, action: TCartActions) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients
      }
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: action.ingredients
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: action.ingredients
      }
    }
    case CLEAR_CART: {
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    }
    default: {
      return state;
    }
  }
}
