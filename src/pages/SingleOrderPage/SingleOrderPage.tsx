import { useEffect } from 'react';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { useParams, useMatch } from 'react-router-dom';
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../../services/actions/wsFeed";
import { WS_PROFILE_ORDERS_CONNECTION_START, WS_PROFILE_ORDERS_CONNECTION_CLOSED } from '../../services/actions/wsProfileOrders';
import styles from './SingleOrderPage.module.css';
import SingleOrder from '../../components/SingleOrder/SingleOrder';
import { IOrder } from '../../constants/constants';

const SingleOrderPage = () => {
  const { id } = useParams();
  const isProfileOrders = useMatch('/profile/orders/:id');
  const isAllOrders = useMatch('/feed/:id');

  const dispatch = useDispatch();

  useEffect(() => {
    if (isProfileOrders) {
      dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_START });
    }
    if (isAllOrders) {
      dispatch({ type: WS_FEED_CONNECTION_START });
    }

    return () => {
      if (isProfileOrders) {
        dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_CLOSED })
      }
      if (isAllOrders) {
        dispatch({ type: WS_FEED_CONNECTION_CLOSED })
      }
    }
  }, [dispatch, isProfileOrders, isAllOrders]);

  const allOrders = useSelector(store => store.wsFeed.orders);
  const profileOrders = useSelector(store => store.wsProfileOrders.orders);
  const order = profileOrders?.find((item: IOrder) => item._id === id) ?? allOrders.find(item => item._id === id);

  return (
    <>
      {order && (
        <div className={`${styles.container} pt-10 pr-10 pb-15 pl-10`}>
          <SingleOrder order={order} modal={true} />
        </div>
      )}
    </>
  )
};

export default SingleOrderPage;
