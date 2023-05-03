import { IOrder } from "../../constants/constants";

export const WS_PROFILE_ORDERS_CONNECTION_START: 'WS_PROFILE_ORDERS_CONNECTION_START' = 'WS_PROFILE_ORDERS_CONNECTION_START';
export const WS_PROFILE_ORDERS_CONNECTION_CLOSE: 'WS_PROFILE_ORDERS_CONNECTION_CLOSE' = 'WS_PROFILE_ORDERS_CONNECTION_CLOSE';

export const WS_PROFILE_ORDERS_CONNECTION_SUCCESS: 'WS_PROFILE_ORDERS_CONNECTION_SUCCESS' = 'WS_PROFILE_ORDERS_CONNECTION_SUCCESS';
export const WS_PROFILE_ORDERS_CONNECTION_CLOSED: 'WS_PROFILE_ORDERS_CONNECTION_CLOSED' = 'WS_PROFILE_ORDERS_CONNECTION_CLOSED';
export const WS_PROFILE_ORDERS_CONNECTION_ERROR: 'WS_PROFILE_ORDERS_CONNECTION_ERROR' = 'WS_PROFILE_ORDERS_CONNECTION_ERROR';
export const WS_PROFILE_ORDERS_GET_MESSAGE: 'WS_PROFILE_ORDERS_GET_MESSAGE' = 'WS_PROFILE_ORDERS_GET_MESSAGE';

export const OPEN_DETAILS: 'OPEN_DETAILS' = 'OPEN_DETAILS';
export const CLOSE_DETAILS: 'CLOSE_DETAILS' = 'CLOSE_DETAILS';

export interface IWsProfileConnectionStartAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_START;
  payload: string;
};

export interface IWsProfileConnectionCloseAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSE;
};

export interface IWsProfileConnectionSuccessAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_SUCCESS;
  wsConnected: boolean;
  error: null;
};

export interface IWsProfileConnectionErrorAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_ERROR;
  wsConnected: boolean;
  payload: string;
  error: string;
};

export interface IWsProfileConnectionClosedAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSED;
  wsConnected: boolean;
  error: null;
};

export interface IWsProfileGetMessageAction {
  readonly type: typeof WS_PROFILE_ORDERS_GET_MESSAGE;
  orders: boolean;
  total: number;
  totalToday: number;
  payload: {
    success: boolean;
    orders: Array<IOrder>;
    total: number;
    totalToday: number;
  };
  error: null;
};

export interface IWsProfileOpenModalAction {
  readonly type: typeof OPEN_DETAILS;
  orderModal: IOrder;
};

export interface IWsProfileCloseModalAction {
  readonly type: typeof CLOSE_DETAILS;
  orderModal: null;
};

export type TWsProfileActions =
  | IWsProfileConnectionStartAction
  | IWsProfileConnectionCloseAction
  | IWsProfileConnectionSuccessAction
  | IWsProfileConnectionErrorAction
  | IWsProfileConnectionClosedAction
  | IWsProfileGetMessageAction
  | IWsProfileOpenModalAction
  | IWsProfileCloseModalAction;

export type TWsProfileFeedActions = {
  wsInit: typeof WS_PROFILE_ORDERS_CONNECTION_START,
  wsClose: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSE,
  onOpen: typeof WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  onClose: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  onError: typeof WS_PROFILE_ORDERS_CONNECTION_ERROR,
  onMessage: typeof WS_PROFILE_ORDERS_GET_MESSAGE,
  wsSendMessage?: unknown;
};

export const wsProfileFeedActions = {
  wsInit: WS_PROFILE_ORDERS_CONNECTION_START,
  wsClose: WS_PROFILE_ORDERS_CONNECTION_CLOSE,
  onOpen: WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  onError: WS_PROFILE_ORDERS_CONNECTION_ERROR,
  onMessage: WS_PROFILE_ORDERS_GET_MESSAGE
}

export const wsProfileFeedConnectionStart = (url: string): IWsProfileConnectionStartAction => {
  return {
    type: WS_PROFILE_ORDERS_CONNECTION_START,
    payload: url
  };
};

export const wsProfileFeedConnectionClose = (): IWsProfileConnectionCloseAction => {
  return {
    type: WS_PROFILE_ORDERS_CONNECTION_CLOSE
  }
};
