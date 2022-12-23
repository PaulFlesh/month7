import tabsStyles from "./Tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function Tabs({currentTab, setCurrentTab}) {
  function switchTab(tab) {
    setCurrentTab(tab)
  }
  return (
    <div className={tabsStyles.tabs}>
      <Tab value="one" active={currentTab === "one"} onClick={switchTab}>
        Булки
      </Tab>
      <Tab value="two" active={currentTab === "two"} onClick={switchTab}>
        Начинки
      </Tab>
      <Tab value="three" active={currentTab === "three"} onClick={switchTab}>
        Соусы
      </Tab>
    </div>
  );
};

Tabs.propTypes = {
  currentTab: PropTypes.string,
  setCurrentTab: PropTypes.func
};
