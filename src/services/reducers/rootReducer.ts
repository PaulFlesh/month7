import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { menuReducer } from './menu';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { feedReducer } from './wsFeed';
import { profileOrderReducer } from './wsProfileOrders';

export const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  wsFeed: feedReducer,
  wsProfileOrders: profileOrderReducer
});
