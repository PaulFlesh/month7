import { getDataFromServer } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const SET_BUN = "SET_BUN";
export const SET_COUNT = "SET_COUNT";
export const OPEN_INGREDIENT_DETAILS = "OPEN_INGREDIENT_DETAILS";

export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const DECREASE_COUNTER = "DECREASE_COUNTER";

export function getMenu() {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getDataFromServer()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
        console.log(err)
      })
  }
}
