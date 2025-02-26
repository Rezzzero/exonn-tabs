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

  const handleDeleteTab = (tabUrl: string) => {
    console.log(tabUrl, "has been deleted");
    setTabs((prev) => prev.filter((tab) => tab.url !== tabUrl));
  };

  const handleSortTabs = (sortedTabs: TabType[]) => {
    setTabs(sortedTabs);
  };

  return { handleAddTab, handleSortTabs, handleDeleteTab };
};
