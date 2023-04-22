import { IConstructorOrder } from "../../constants/constants";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS,
  TOrderActions
} from "../actions/order";

type TInitialState = {
  order: null | IConstructorOrder;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
};

const initialState: TInitialState = {
  order: null,
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderSuccess: false,
        orderFailed: false
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderSuccess: true,
        orderFailed: false
      }
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: false,
        orderFailed: true
      }
    }
    default: {
      return state;
    }
  }
}
