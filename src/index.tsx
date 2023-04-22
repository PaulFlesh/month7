import { compose, createStore, applyMiddleware } from 'redux';
import { wsFeedActions } from './services/actions/wsFeed';
import { wsProfileFeedActions } from './services/actions/wsProfileOrders';
import { socketMiddleware } from './services/socketMiddleware/socketMiddleware';
import { wsAllUrl, wsProfileOrdersUrl } from './constants/constants';
import { rootReducer } from './services/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from "redux-thunk";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsAllUrl, wsFeedActions, false),
    socketMiddleware(wsProfileOrdersUrl, wsProfileFeedActions, true)
  )
);

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals();
