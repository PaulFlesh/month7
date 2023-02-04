import { useEffect, useState, useRef } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../../services/actions/menu";
import { SET_COUNT } from '../../services/actions/menu';
import Modal from "../Modal/Modal";
import Tabs from "./Tabs/Tabs";
import CategoryContainer from "./CategoryContainer/CategoryContainer";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

export default function BurgerIngredients() {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalIngredient = useSelector(store => store.menu.ingredientDetailsModal);
  const allIngredients = useSelector(store => store.menu.items);
  const buns = allIngredients.filter(item => item.type === 'bun');
  const fills = allIngredients.filter(item => item.type === 'main');
  const sauces = allIngredients.filter(item => item.type === 'sauce');

  useEffect(() => {
    dispatch({
      type: SET_COUNT,
      items: allIngredients
    });
  }, [dispatch, allIngredients]);

  function openIngredientDetails(ingredient) {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      ingredient: ingredient
    });
    setOpened(true)
  };

  function closeIngredientDetails() {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
    setOpened(false);
    navigate(-1)
  };

  useEffect(() => {
    let url = window.location.href;
    let sections = url.split('/');
    let lastSection = sections.pop() || sections.pop();
    const ingredient = allIngredients.find(item => item._id === lastSection);
    if (ingredient !== undefined) {
      openIngredientDetails(ingredient)
    }
  }, [dispatch, allIngredients]); // eslint-disable-line

  const ingredientsScrollRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("one");
  const [scrollTop, setScrollTop] = useState(0);

  function setTabByClick(event) {
    setCurrentTab(event);
    setScrollTop(setCategoryPosition(event));
  };

  function setCategoryPosition(action) {
    if (action === "one") {
      return 0;
    } else if (action === "two") {
      return 302;
    } else if (action === "three") {
      return 1564;
    }
  };

  useEffect(() => {
    ingredientsScrollRef.current.scrollTop = scrollTop;
  }, [scrollTop]
  );

  function handleScroll(event) {
    setScrollTop(event.currentTarget.scrollTop);
    if (event.currentTarget.scrollTop <= 301) {
      setCurrentTab("one");
    } else if (
      event.currentTarget.scrollTop >= 302 &&
      event.currentTarget.scrollTop < 1364
    ) {
      setCurrentTab("two");
    } else {
      setCurrentTab("three");
    }
  };

  return (
    <section className={burgerIngredientsStyles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h2>
      <Tabs currentTab={currentTab} setCurrentTab={setTabByClick} />
      <div className={`${burgerIngredientsStyles.menu} scrollbar`}
        onScroll={handleScroll}
        ref={ingredientsScrollRef}
      >
        <div className="pt-10">
          <h2 className={'text text_type_main-medium pb-6'} id='bun'>Булки</h2>
          <CategoryContainer sortedIngredients={buns} openIngredientDetails={openIngredientDetails} />
        </div>
        <div className="pt-10">
          <h2 className={'text text_type_main-medium pb-6'} id='main'>Начинки</h2>
          <CategoryContainer sortedIngredients={fills} openIngredientDetails={openIngredientDetails} />
        </div>
        <div className="pt-10">
          <h2 className={'text text_type_main-medium pb-6'} id='sauce'>Соусы</h2>
          <CategoryContainer sortedIngredients={sauces} openIngredientDetails={openIngredientDetails} />
        </div>
      </div>
      {opened ?
        <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
          <IngredientDetails ingredient={modalIngredient} />
        </Modal> : null
      }
    </section>
  )
};
