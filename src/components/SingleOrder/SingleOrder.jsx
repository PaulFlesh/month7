import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./SingleOrder.module.css";
import currency from "../../images/total_currency.svg";
import PropTypes from "prop-types";
import { orderStatusSelector, consolidate } from "../../utils/utils";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export default function SingleOrder({ order, modal }) {
  const menu = useSelector(store => store.menu.items);

  const orderIngredientsLength = order.ingredients.length;
  const maxLength = 6;
  const hiddenIngredients = orderIngredientsLength - 6;

  const orderIngredientsData = useMemo(() => {
    return order.ingredients.map(id => {
      return menu.find(item => {
        return id === item._id;
      });
    });
  }, [order.ingredients, menu]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData.reduce((sum, item) => {

      return (sum += item ? item.price : 0);
    }, 0);
  }, [orderIngredientsData]);

  function countItemPrice(ingredient) {
    let count = orderIngredientsData.filter(item => {
      return item === ingredient
    }).length;
    return count
  }

  const orderIngredient = useMemo(() => {
    return orderIngredientsData.map((elem) => {
      return menu.find((item) => {
        return elem._id === item._id;
      });
    });
  }, [orderIngredientsData, menu]);

  const orderIngredients = consolidate(orderIngredient);

  return (
    <>
      {order && (
        <>
          <div className={styles.meta}>
            <p className={`text text_type_digits-default ${modal && `mt-10 mb-10 ${styles.order_id}`}`}>#{order.number}</p>
            {!modal && (
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(order.createdAt)} />
              </p>
            )}
          </div>
          <p className={`mt-6 text text_type_main-medium ${styles.name}`}>{order.name}</p>
          {modal && (
            <>
              <p className={`text text_type_main-default mt-3 mb-15 ${styles.status}`}>
                {orderStatusSelector(order.status)}
              </p>
              <p className={`text text_type_main-medium mb-6 ${styles.composition}`}>
                Состав:
              </p>
            </>
          )}
          <div className={modal ? styles.order_info_modal : styles.order_info}>
            {modal ? (
              <ul className={styles.ingredient_list_modal}>
                {orderIngredients.map((item, index) => {
                  return (
                    <li className={styles.list_item} key={index}>
                      <div className={styles.price_counter}>
                        <div className={styles.image_container}>
                          <div className={styles.image_background}>
                            <img className={styles.image} src={item.image} alt={item.name} />
                          </div>
                        </div>
                        <p className={`${styles.list_item_name} text text_type_main-default ml-4`}>{item.name}</p>
                      </div>
                      <div className={styles.price_counter}>
                        <p className="text text_type_digits-default">{countItemPrice(item)} x {item.price}</p>
                        <img className={`${styles.currency} ml-2`} src={currency} alt="Межгалактические кредиты" />
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <ul className={styles.ingredient_list}>
                {orderIngredientsLength <= 5 &&
                  orderIngredientsData.map((item, index) => {
                    let zIndex = maxLength - index;
                    return (
                      <li
                        className={styles.order_feed_image}
                        style={{ zIndex: zIndex }}
                        key={index}
                      >
                        <div className={styles.image_container}>
                          <div className={styles.image_background}>
                            <img className={styles.image} src={item.image} alt={item.name} />
                          </div>
                        </div>
                      </li>
                    )
                  })}
                {orderIngredientsData &&
                  orderIngredientsLength >= 6 &&
                  orderIngredientsData.slice(0, 5).map((item, index) => {
                    let zIndex = maxLength - index;
                    return (
                      <li
                        className={styles.order_feed_image}
                        style={{ zIndex: zIndex }}
                        key={index}
                      >
                        <div className={styles.image_container}>
                          <div className={styles.image_background}>
                            <img className={styles.image} src={item.image} alt={item.name} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                {orderIngredientsData &&
                  orderIngredientsLength > 6 &&
                  orderIngredientsData.slice(5, 6).map((item, index) => {
                    let zIndex = -index;
                    return (
                      <li
                        className={styles.order_feed_image}
                        style={{ zIndex: zIndex }}
                        key={index}
                      >
                        <div className={styles.hidden_overlay}>
                          <div className={`${styles.image_container} ${styles.hidden}`}>
                            <div className={styles.image_background}>
                              <img className={styles.image} src={item.image} alt={item.name} />
                            </div>
                          </div>
                          <p className={`text text_type_main-default ${styles.hidden_count}`}>
                            {`+${hiddenIngredients}`}
                          </p>
                        </div>
                      </li>
                    )
                  })}
              </ul>
            )}
            <div className={styles.order_footer}>
              {modal && (
                <p className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(order.createdAt)} />
                </p>
              )}
              <div className={styles.totalPrice}>
                <span className="text text_type_digits-default">{orderTotalPrice}</span>
                <img className={styles.currency} src={currency} alt="Межгалактические кредиты" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

SingleOrder.propTypes = {
  order: PropTypes.object,
  modal: PropTypes.bool
}
