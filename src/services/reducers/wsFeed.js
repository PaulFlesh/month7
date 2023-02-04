import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  OPEN_DETAILS,
  CLOSE_DETAILS
} from "../actions/wsFeed";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  orderModal: null
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null
      }
    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      }
    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: null
      }
    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: null
      }
    case OPEN_DETAILS: {
      return {
        ...state,
        orderModal: action.order
      }
    }
    case CLOSE_DETAILS: {
      return {
        ...state,
        orderModal: null
      }
    }
    default:
      return state
  }
}
