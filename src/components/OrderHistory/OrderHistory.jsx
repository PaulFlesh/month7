import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import SingleOrder from "../../components/SingleOrder/SingleOrder";
import {
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  OPEN_DETAILS,
  CLOSE_DETAILS
} from "../../services/actions/wsProfileOrders";
import orderHistoryStyles from "./OrderHistory.module.css";
import Modal from "../../components/Modal/Modal";

export default function OrderHistory() {
  //const { id } = useParams(); Слишком быстро отрабатывает, WS не успевает достать нужный заказ из ленты
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const [opened, setOpened] = useState(false);

  function openDetails(item) {
    dispatch({
      type: OPEN_DETAILS,
      order: item
    });
    setOpened(true)
  };

  function closeDetails() {
    dispatch({ type: CLOSE_DETAILS });
    setOpened(false);
    navigate(-1)
  };

  const { orders, orderModal } = useSelector(store => store.wsProfileOrders);

  useEffect(() => {
    let url = window.location.href;
    let sections = url.split('/');
    let lastSection = sections.pop() || sections.pop();
    const orderId = orders.find(item => item._id === lastSection);
    console.log(orderId);
    if (orderId !== undefined) {
      openDetails(orderId)
    }
  }, [dispatch, orders]); // eslint-disable-line

  if (!orders) {
    return (
      <h3 className="text text_type_main-large mt-2">
        Загрузка...
      </h3>
    )
  }

  if (orders.length === 0) {
    return (
      <h3 className="text text_type_main-large mt-2">
        Тут будут отображаться Ваши заказы
      </h3>
    )
  }

  return (
    <>
      <ul className={orderHistoryStyles.order_list}>
        {orders &&
          orders.reverse().map(item => {
            return (
              <li className={orderHistoryStyles.item}
                key={item._id}
                onClick={() => { openDetails(item) }}
              >
                <Link to={`/profile/orders/${item._id}`}
                  state={{ background: location }}
                  className={orderHistoryStyles.link}
                >
                  <SingleOrder order={item} key={item._id} modal={false} />
                </Link>
              </li>
            )
          })}
      </ul>
      {opened &&
        <Modal onClose={closeDetails}>
          <SingleOrder order={orderModal} modal={true} />
        </Modal>
      }
    </>
  )
}
