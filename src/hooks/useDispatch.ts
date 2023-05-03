import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch } from '../constants/constants';

export const useDispatch = () => dispatchHook<AppDispatch>();
