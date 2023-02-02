import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { menuReducer } from './menu';
import { orderReducer } from './order';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer
});
