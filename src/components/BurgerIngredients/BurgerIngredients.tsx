import { FC, useEffect, useState, useRef, SyntheticEvent } from "react";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import { useNavigate } from 'react-router-dom';
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../../services/actions/menu";
import Modal from "../Modal/Modal";
import Tabs from "./Tabs/Tabs";
import CategoryContainer from "./CategoryContainer/CategoryContainer";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IIngredient } from "../../constants/constants";
import { useSelector } from "../../hooks/useSelector";
import { useDispatch } from "../../hooks/useDispatch";

const BurgerIngredients: FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, ingredientDetailsModal } = useSelector(store => store.menu);
  const buns = items.filter(item => item.type === 'bun');
  const fills = items.filter(item => item.type === 'main');
  const sauces = items.filter(item => item.type === 'sauce');

  function openIngredientDetails(ingredient: IIngredient): void {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      ingredient: ingredient
    });
    setOpened(true)
  };

  function closeIngredientDetails(): void {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
    setOpened(false);
    navigate(-1)
  };

  useEffect(() => {
    let url = window.location.href;
    let sections = url.split('/');
    let lastSection = sections.pop() || sections.pop();
    const ingredient = items.find(item => item._id === lastSection);
    if (ingredient !== undefined) {
      openIngredientDetails(ingredient)
    }
  }, [dispatch, items]); // eslint-disable-line

  const ingredientsScrollRef: any = useRef(null); // any
  const [currentTab, setCurrentTab] = useState("one");
  const [scrollTop, setScrollTop] = useState(0);

  function setTabByClick(tab: string): void {
    setCurrentTab(tab);
    setScrollTop(setCategoryPosition(tab));
  };

  function setCategoryPosition(pos: string): any { // any
    if (pos === "one") {
      return 0;
    } else if (pos === "two") {
      return 302;
    } else if (pos === "three") {
      return 1564;
    }
  };

  useEffect(() => {
    ingredientsScrollRef.current.scrollTop = scrollTop;
  }, [scrollTop]
  );

  function handleScroll(e: SyntheticEvent): void {
    setScrollTop(e.currentTarget.scrollTop);
    if (e.currentTarget.scrollTop <= 301) {
      setCurrentTab("one");
    } else if (
      e.currentTarget.scrollTop >= 302 &&
      e.currentTarget.scrollTop < 1364
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
          <IngredientDetails ingredient={ingredientDetailsModal} />
        </Modal> : null
      }
    </section>
  )
};

export default BurgerIngredients;
