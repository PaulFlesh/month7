import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import getDataFromServer from "../utils/api";
import Modal from "../Modal/Modal";

export default function App() {
  const [isIngredientModalOpened, setIngredientModalOpened] = React.useState(false);
  const [isOrderModalOpened, setOrderModalOpened] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getDataFromServer()
    .then((extData) => {
      setData(extData.data);
    })
    .catch(err => console.log(err));
  }, []);

  const openIngredientModal = React.useCallback(
    (obj:any) => {
      setIngredientModalOpened(true);
      setCurrentIngredient(obj);
    }, [currentIngredient]);

  const openOrderModal = React.useCallback(
    () => {
      setOrderModalOpened(true);
    }, []);

  const closeIngredientModal = () => {
    setIngredientModalOpened(false);
  };

  const closeOrderModal = () => {
    setOrderModalOpened(false);
  };

  const IngredientModal = (
    <Modal title={'Детали ингредиента'} handleClose={closeIngredientModal}>
      <IngredientDetails ingredient={currentIngredient} />
    </Modal>
  );

  const OrderModal = (
    <Modal title={'034536'} handleClose={closeOrderModal}>
      <OrderDetails />
    </Modal>
  );

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients extData={data} handleOpenModal={openIngredientModal} />
        <BurgerConstructor extData={data} handleOpenModal={openOrderModal} />
      </main>
      {isIngredientModalOpened && IngredientModal}
      {isOrderModalOpened && OrderModal}
    </>
  );
}
