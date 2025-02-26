"use client";

import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "./storage/useTabStorage";
import { useTabActions } from "./hooks/useTabHelper";

export default function Home() {
  const { tabs, setTabs } = useTabsStorage();
  const { handleAddTab, handleSortTabs, handleDeleteTab } =
    useTabActions(setTabs);

  return (
    <div className="flex items-center">
      <Navbar
        tabs={tabs}
        onSortTabs={handleSortTabs}
        handleDeleteTab={handleDeleteTab}
      />
      <button onClick={handleAddTab} className="font-normal text-4xl ml-2 pb-2">
        +
      </button>
    </div>
  );
}
