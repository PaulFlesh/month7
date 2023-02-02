import { ordersUrl } from '../../constants/constants';
import { request } from "../../utils/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export function getOrderData(ingredients) {
  return function (dispatch) {
    dispatch({ type: CREATE_ORDER_REQUEST });
    request(ordersUrl, {
      method: 'POST',
      headers: {
        authorization: 'eeb10f4c-568d-4124-bc82-28113d2b839d',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ingredients })
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            name: res.name,
            order: {
              number: res.order.number
            }
          })
        }
      })
      .catch(() => dispatch({ type: CREATE_ORDER_FAILED }))
  }
};
