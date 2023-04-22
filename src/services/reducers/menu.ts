import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_BUN,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  TMenuActions
} from '../actions/menu';
import { IIngredient } from '../../constants/constants';

type TInitialState = {
  selectedBunId: null | string;
  items: Array<IIngredient>;
  menuRequest: boolean;
  menuFailed: boolean;
  ingredientDetailsModal: null | IIngredient;
};

const initialState: TInitialState = {
  selectedBunId: null,
  items: [],
  menuRequest: false,
  menuFailed: false,
  ingredientDetailsModal: null
};

export const menuReducer = (state = initialState, action: TMenuActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        menuRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        menuRequest: false,
        items: action.items
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        menuRequest: false,
        menuFailed: true
      }
    }
    case SET_BUN: {
      return {
        ...state,
        selectedBunId: action.id
      }
    }
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetailsModal: action.ingredient
      }
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetailsModal: null
      }
    }
    case INCREASE_COUNTER: {
      return {
        ...state,
        items: action.items
      }
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        items: action.items
      }
    }
    default: {
      return state;
    }
  }
}
