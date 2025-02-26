"use client";

import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "./storage/useTabStorage";
import { words } from "./constants";

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export default function Home() {
  const { tabs, setTabs } = useTabsStorage();

  const handleAddTab = () => {
    const newTab = {
      title: getRandomWord(),
      url: `${new Date().getTime()}`,
      fixed: false,
    };
    setTabs((prev) => [...prev, newTab]);
  };
  const handleSortTabs = (
    sortedTabs: { title: string; url: string; fixed: boolean }[]
  ) => {
    setTabs(sortedTabs);
  };

  return (
    <div className="flex">
      <Navbar tabs={tabs} onSortTabs={handleSortTabs} />
      <button onClick={handleAddTab}>Add Tab</button>
    </div>
  );
}
