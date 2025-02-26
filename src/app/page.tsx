"use client";

import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "./storage/useTabStorage";

export default function Home() {
  const { tabs, setTabs } = useTabsStorage();

  const handleAddTab = () => {
    const newTab = `Tab ${new Date().getTime()}`;
    setTabs((prev) => [...prev, newTab]);
  };

  const handleSortTabs = (sortedTabs: string[]) => {
    setTabs(sortedTabs);
  };

  return (
    <div className="flex">
      <Navbar tabs={tabs} onSortTabs={handleSortTabs} />
      <button onClick={handleAddTab}>Add Tab</button>
    </div>
  );
}
