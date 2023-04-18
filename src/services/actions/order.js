import { ordersUrl } from '../../constants/constants';
import { request, postOrderFetch } from "../../utils/api";
import { getCookie } from '../../utils/utils';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export function getOrderData(ingredients) {
  return function (dispatch) {
    dispatch({ type: CREATE_ORDER_REQUEST });
    request(ordersUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: "Bearer " + getCookie('accessToken'),
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
