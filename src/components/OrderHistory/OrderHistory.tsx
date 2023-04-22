import { FC, useState, useEffect } from "react";
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { useLocation, useNavigate, Link } from "react-router-dom";
import SingleOrder from "../SingleOrder/SingleOrder";
import {
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  OPEN_DETAILS,
  CLOSE_DETAILS
} from "../../services/actions/wsProfileOrders";
import orderHistoryStyles from "./OrderHistory.module.css";
import Modal from "../Modal/Modal";
import { IOrder } from "../../constants/constants";

const OrderHistory: FC = () => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_PROFILE_ORDERS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  function openDetails(order: IOrder): void {
    dispatch({
      type: OPEN_DETAILS,
      orderModal: order
    });
    setOpened(true)
  };

  function closeDetails(): void {
    dispatch({ type: CLOSE_DETAILS });
    setOpened(false);
    navigate(-1)
  };

  const { wsConnected, orders, orderModal } = useSelector(store => store.wsProfileOrders);

  useEffect(() => {
    let url = window.location.href;
    let sections = url.split('/');
    let lastSection = sections.pop() || sections.pop();
    if (wsConnected && orders.length !== 0) {
      const orderId = orders.find((item: IOrder) => item._id === lastSection);
      if (orderId !== undefined) {
        openDetails(orderId)
      }
    }
  }, [dispatch, orders]); // eslint-disable-line

  if (!orders) {
    return (
      <h3 className="text text_type_main-large mt-2">
        Загрузка...
      </h3>
    )
  }

  if (orders?.length === 0) {
    return (
      <h3 className="text text_type_main-large mt-2">
        Тут будут отображаться Ваши заказы
      </h3>
    )
  }

  return (
    <>
      <ul className={orderHistoryStyles.order_list}>
        {wsConnected && orders &&
          orders?.reverse().map((item: IOrder) => {
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
      {opened ?
        <Modal title=" " onClose={closeDetails}>
          <SingleOrder order={orderModal} modal={true} />
        </Modal> : null
      }
    </>
  )
};

export default OrderHistory;
