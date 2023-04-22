import { IOrder } from "../../constants/constants";

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_CLOSE: 'WS_FEED_CONNECTION_CLOSE' = 'WS_FEED_CONNECTION_CLOSE';

export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';

export const OPEN_DETAILS: 'OPEN_DETAILS' = 'OPEN_DETAILS';
export const CLOSE_DETAILS: 'CLOSE_DETAILS' = 'CLOSE_DETAILS';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
  payload: string;
};

export interface IWsConnectionCloseAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSE;
};

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
  wsConnected: boolean;
  error: null;
};

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  wsConnected: boolean;
  payload: string;
  error: string;
};

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
  wsConnected: boolean;
  error: null;
};

export interface IWsGetMessageAction {
  readonly type: typeof WS_FEED_GET_MESSAGE;
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

export interface IWsOpenModalAction {
  readonly type: typeof OPEN_DETAILS;
  orderModal: IOrder;
};

export interface IWsCloseModalAction {
  readonly type: typeof CLOSE_DETAILS;
  orderModal: null;
};

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionCloseAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction
  | IWsOpenModalAction
  | IWsCloseModalAction;

export type TWsFeedActions = {
  wsInit: typeof WS_FEED_CONNECTION_START,
  wsClose: typeof WS_FEED_CONNECTION_CLOSE,
  onOpen: typeof WS_FEED_CONNECTION_SUCCESS,
  onClose: typeof WS_FEED_CONNECTION_CLOSED,
  onError: typeof WS_FEED_CONNECTION_ERROR,
  onMessage: typeof WS_FEED_GET_MESSAGE,
  wsSendMessage?: unknown;
};

export const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsClose: WS_FEED_CONNECTION_CLOSE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
}

export const wsFeedConnectionStart = (url: string): IWsConnectionStartAction => {
  return {
    type: WS_FEED_CONNECTION_START,
    payload: url
  };
};

export const wsFeedConnectionClose = (): IWsConnectionCloseAction => {
  return {
    type: WS_FEED_CONNECTION_CLOSE
  }
};
