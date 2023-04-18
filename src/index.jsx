import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { 
  WS_FEED_CONNECTION_START,
  WS_FEED_SEND_MESSAGE,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_GET_MESSAGE
} from './services/actions/wsFeed';
import { 
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_SEND_MESSAGE,
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_GET_MESSAGE
} from './services/actions/wsProfileOrders';
import { socketMiddleware } from './services/socketMiddleware/socketMiddleware';
import { wsAllUrl, wsProfileOrdersUrl } from './constants/constants.js';
import { rootReducer } from './services/reducers/rootReducer.js';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from "redux-thunk";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const feedWsActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
};

const userOrdersWsActions = {
  wsInit: WS_PROFILE_ORDERS_CONNECTION_START,
  wsSendMessage: WS_PROFILE_ORDERS_SEND_MESSAGE,
  onOpen: WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  onError: WS_PROFILE_ORDERS_CONNECTION_ERROR,
  onMessage: WS_PROFILE_ORDERS_GET_MESSAGE
};

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsAllUrl, feedWsActions, false),
    socketMiddleware(wsProfileOrdersUrl, userOrdersWsActions, true)
  )
);

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
