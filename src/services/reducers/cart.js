import {
  ADD_BUN,
  ADD_INGREDIENTS,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  SET_TOTAL_PRICE
} from "../actions/cart";

import {
  isBun,
  addBun,
  moveIngredient,
  deleteIngredient,
  getTotal
} from "../../components/utils/utils";

const initialState = {
  bun: [],
  ingredients: [],
  totalPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: addBun(action.item, [...state.bun])
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ...state.ingredients.push(
          action.items.find((item) =>
            item._id === action.id && !isBun(item) ? item : null
          )
        )
      }
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: moveIngredient(
          [...state.ingredients],
          action.id,
          action.index
        ),
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: deleteIngredient([...state.ingredients], action.id)
      }
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: getTotal(state.bun, state.ingredients)
      };
    }
    default: {
      return state;
    }
  }
}
