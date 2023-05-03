import {
  TypedUseSelectorHook,
  useSelector as selectorHook
} from 'react-redux';
import { RootState } from '../constants/constants';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
