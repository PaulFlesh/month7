import {
  ADD_BUN,
  ADD_INGREDIENTS,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  SET_TOTAL_PRICE
} from "../actions/cart";

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
        bun: action.bun
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ...state.ingredients.push(
          action.items.find((item) =>
            item._id === action.id ? item : null
          )
        )
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
        ingredients: action.key
      }
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice
      };
    }
    default: {
      return state;
    }
  }
}
