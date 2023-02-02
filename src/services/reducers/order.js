import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS
} from "../actions/order";

const initialState = {
  order: {
    number: null,
  },
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
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
        name: action.name,
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
