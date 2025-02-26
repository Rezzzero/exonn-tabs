import { TabType } from "../types";
import { words } from "../constants";

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const useTabActions = (
  setTabs: React.Dispatch<React.SetStateAction<TabType[]>>
) => {
  const handleAddTab = () => {
    const newTab: TabType = {
      title: getRandomWord(),
      url: `${new Date().getTime()}`,
      fixed: false,
    };
    setTabs((prev) => [...prev, newTab]);
  };

  const handleSortTabs = (sortedTabs: TabType[]) => {
    setTabs(sortedTabs);
  };

  return { handleAddTab, handleSortTabs };
};
