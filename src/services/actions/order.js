import { postOrder } from "../../components/utils/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export function getOrderData(data) {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    postOrder(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            name: res.name,
            order: {
              number: res.order.number
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: CREATE_ORDER_FAILED, err });
      })
  };
}
