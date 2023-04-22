import { AppDispatch, IConstructorOrder, IOrder, ordersUrl } from '../../constants/constants';
import { request } from "../../utils/api";
import { getCookie } from '../../utils/utils';

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';

export interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
};

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  order: IConstructorOrder;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
};

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
};

export type TOrderActions =
  | ICreateOrderRequestAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction;

type TOrderFetch = {
  success: boolean;
  order: IOrder;
  name: string;
}

export const getOrderData = (ingredients: Array<string>) => (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  return request(ordersUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': "Bearer " + getCookie('accessToken'),
    },
    body: JSON.stringify({ ingredients })
  })
    .then((res: TOrderFetch) => {
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
    .catch((err: string) => {
      dispatch({ type: CREATE_ORDER_FAILED });
      console.log(err);
    })
};
