import { IOrder } from "../../constants/constants";
import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  OPEN_DETAILS,
  CLOSE_DETAILS,
  TWsActions
} from "../actions/wsFeed";

type TInitialState = {
  wsConnected: boolean;
  orders: Array<IOrder>;
  total: number;
  totalToday: number;
  error: null | string;
  orderModal: null | IOrder
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  orderModal: null
};

export const feedReducer = (state = initialState, action: TWsActions) => {
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
        orderModal: action.orderModal
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
