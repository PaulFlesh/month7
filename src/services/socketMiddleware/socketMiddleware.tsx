import { TWsFeedActions } from "../actions/wsFeed";
import { TWsProfileFeedActions } from "../actions/wsProfileOrders";
import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from "../../constants/constants";
import { getCookie } from "../../utils/utils";

export const socketMiddleware = ( wsUrl: string, wsActions: TWsFeedActions | TWsProfileFeedActions, isAuth: boolean ): Middleware => {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		return next => action => {
			const { dispatch } = store;
			const { type, payload } = action;
			const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
			const accessToken = getCookie('accessToken');

			if (type === wsInit) {
				if (isAuth) {
					socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
				} else {
					socket = new WebSocket(wsUrl);
				}
			}
			
			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;
					dispatch({ type: onMessage, payload: restParsedData });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === wsClose) {
          if (socket.readyState === 1) {
            socket.close();
            socket = null;
          }       
        }

				if (type === wsSendMessage) {
					const data = { ...payload };
					socket?.send(JSON.stringify(data));
				}
			}
			next(action);
		}
	}
}
