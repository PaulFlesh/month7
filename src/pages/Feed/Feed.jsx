import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SingleOrder from "../../components/SingleOrder/SingleOrder";
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
  OPEN_DETAILS,
  CLOSE_DETAILS
} from "../../services/actions/wsFeed";
import feedStyles from "./Feed.module.css";
import Modal from "../../components/Modal/Modal";
import { filterOrderStatus } from "../../utils/utils";

export default function Feed() {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START });
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  const { orders, total, totalToday, orderModal } = useSelector(store => store.wsFeed);
  const orderStatus = orders ? filterOrderStatus(orders) : null;

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

  useEffect(() => {
    let url = window.location.href;
    let sections = url.split('/');
    let lastSection = sections.pop() || sections.pop();
    const orderId = orders.find(item => item._id === lastSection);
    if (orderId !== undefined) {
      openDetails(orderId)
    }
  }, [dispatch, orders]); // eslint-disable-line

  return (
    <>
      <section className={feedStyles.section}>
        <h2 className="text text_type_main-large mt-10 mb-5">
          Лента заказов
        </h2>
        <ul className={feedStyles.order_list}>
          {orders &&
            orders.map((item, index) => {
              return (
                <li className={feedStyles.item}
                  key={index}
                  onClick={() => { openDetails(item) }}
                >
                  <Link to={`/feed/${item._id}`}
                    state={{ background: location }}
                    className={feedStyles.link}
                  >
                    <SingleOrder order={item} key={index} modal={false} />
                  </Link>
                </li>
              )
            })}
        </ul>
      </section>
      <section className={feedStyles.section}>
        <div className={`${feedStyles.stats} mt-25`}>
          <div className={feedStyles.order_board}>
            <div className={feedStyles.status}>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <div className={feedStyles.order_numbers}>
                {orderStatus.done.map((item, index) => (
                  <p className={`${feedStyles.order_number} text text_type_digits-default`} key={index}>{item}</p>
                ))}
              </div>
            </div>
            <div className={feedStyles.status}>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <div className={feedStyles.order_numbers}>
                {orderStatus.pending.map((item, index) => (
                  <p className="text text_type_digits-default" key={index}>{item}</p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
            <p className={`${feedStyles.total} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div>
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <p className={`${feedStyles.total} text text_type_digits-large`}>
              {totalToday}
            </p>
          </div>
        </div>
      </section>
      {opened ?
        <Modal onClose={closeDetails}>
          <SingleOrder order={orderModal} modal={true} />
        </Modal> : null
      }
    </>
  )
}
