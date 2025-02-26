"use client";

import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "./storage/useTabStorage";
import { useTabActions } from "./hooks/useTabHelper";

export default function Home() {
  const { tabs, setTabs } = useTabsStorage();
  const { handleAddTab, handleSortTabs } = useTabActions(setTabs);

  return (
    <div className="flex items-center">
      <Navbar tabs={tabs} onSortTabs={handleSortTabs} />
      <button onClick={handleAddTab}>+</button>
    </div>
  );
}
