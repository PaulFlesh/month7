import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import burgerConstructorStyles from "./BurgerConstructor.module.css";
import { useDrop } from "react-dnd";
import { ADD_BUN, ADD_INGREDIENTS, SET_TOTAL_PRICE } from "../../services/actions/cart";
import { getOrderData } from "../../services/actions/order";
import { isBun, hasBun, addBun, getIds, getTotal } from "../../utils/utils";
import { SET_BUN, INCREASE_COUNTER } from "../../services/actions/menu";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from 'uuid';
import CartItem from "./CartItem/CartItem";
import Modal from "../Modal/Modal";
import OrderDetails from '../OrderDetails/OrderDetails';
import total_currency from "../../images/total_currency.svg";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.menu.items);
  const ingredientsWithoutBuns = ingredients.filter(item => item.type !== 'bun');
  const constructorList = useSelector(store => store.cart.ingredients);
  const bun = useSelector(store => store.cart.bun);
  const selectedBun = Object.keys(bun).length !== 0;
  const orderNumber = useSelector(store => store.order.order.number);

  const addItemToCart = (item) => {
    if (!isBun(item)) {
      if (hasBun(bun)) {
        dispatch({
          type: ADD_INGREDIENTS,
          id: item._id,
          items: ingredientsWithoutBuns,
          //ingredient: {...ingredient, key: uuidv4()}
        });
        dispatch({
          type: INCREASE_COUNTER,
          id: item._id,
          items: ingredients
        });
      } else {
        alert("Как же без булок?");
      }
    } else {
      dispatch({
        type: SET_BUN,
        id: item._id,
        ingredientType: item.type,
      });
      dispatch({
        type: ADD_BUN,
        bun: addBun(item, bun)
      });
    }
    dispatch({
      type: SET_TOTAL_PRICE,
      totalPrice: getTotal(bun, constructorList)
    });
  };


  const TotalPrice = () => {
    const bunPrice = bun[0].price * 2;
    const ingredientsPrice = constructorList.reduce((acc, item) => acc + item.price, 0);
    const price = bunPrice + ingredientsPrice;
    return (
      <p className={"text text_type_digits-medium mr-2"}>{price.toFixed(0)}</p>
    );
  };

  
  const [opened, setOpened] = useState(false);
  const openOrderModal = () => {
    dispatch(getOrderData(getIds(bun.concat(constructorList))));
    setOpened(true);
  }
  
  const [, drop] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      item: monitor.getItem(),
    }),
    drop(ingredient) {
      addItemToCart(ingredient);
      ingredient.key = uuidv4()
    }
  });

  if (selectedBun === false) {
    return (
      <section className={`${burgerConstructorStyles.section} mt-25`} ref={drop}>
        <p className={`${burgerConstructorStyles.empty} text text_type_main-medium`}>Перетащите ингредиенты сюда</p>
      </section>
    );
  } else {
    return (
      <section className={`${burgerConstructorStyles.section} mt-25`} ref={drop}>
        <ul className={burgerConstructorStyles.container}>
          <ConstructorElement
            key={bun[0]._id}
            ingredient={bun[0]}
            text={bun[0].name + ' (верх)'}
            thumbnail={bun[0].image}
            isLocked={true}
            price={bun[0].price}
            type='top'
            extraClass="ml-5"
          />
          <ul className={burgerConstructorStyles.ingredients__container}>
            {constructorList.map((element, index) => {
              return (
                <CartItem
                  index={index}
                  ingredient={element}
                  key={element.key}
                />);
            })}
          </ul>
          <div >
            <ConstructorElement
              text={bun[0].name + ' (низ)'}
              thumbnail={bun[0].image}
              price={bun[0].price}
              isLocked={true}
              type="bottom"
              extraClass="ml-5"
            />
          </div>
        </ul>
        <div className={`mr-4 mt-10 ${burgerConstructorStyles.total}`}>
          <TotalPrice />
          <img className="mr-10 ml-1" src={total_currency} alt="Межгалактические кредиты" />
          <Button htmlType='button'
            type="primary"
            size="large"
            onClick={openOrderModal}
          >
            Оформить заказ
          </Button>
        </div>
        {orderNumber && (
          <Modal title={orderNumber} opened={opened} handleClose={() => setOpened(false)}>
            <OrderDetails />
          </Modal>
        )}
      </section>
    )
  };
};
