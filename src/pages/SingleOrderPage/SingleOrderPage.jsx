import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from "../../services/actions/wsFeed";
import styles from './SingleOrderPage.module.css';
import SingleOrder from '../../components/SingleOrder/SingleOrder';

export default function SingleOrderPage() {
  const { id } = useParams();
  const orders = useSelector(store => store.wsFeed.orders);
  const order = orders.find(item => item._id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START });
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  return (
    <>
      {order && (
        <div className={`${styles.container} pt-10 pr-10 pb-15 pl-10`}>
          <SingleOrder order={order} modal={true} />
        </div>
      )}
    </>
  )
}
