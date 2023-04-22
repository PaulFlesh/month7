import { FC } from "react";
import tabsStyles from "./Tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface ITabsProps {
  currentTab: string,
  setCurrentTab(tab: string): void
}

const Tabs: FC<ITabsProps> = ({ currentTab, setCurrentTab }) => {

  return (
    <div className={tabsStyles.tabs}>
      <Tab value="one" active={currentTab === "one"} onClick={() => setCurrentTab("one")}>
        Булки
      </Tab>
      <Tab value="two" active={currentTab === "two"} onClick={() => setCurrentTab("two")}>
        Начинки
      </Tab>
      <Tab value="three" active={currentTab === "three"} onClick={() => setCurrentTab("three")}>
        Соусы
      </Tab>
    </div>
  );
};

export default Tabs;
