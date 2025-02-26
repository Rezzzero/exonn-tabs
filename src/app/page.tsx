"use client";

import { Navbar } from "@components/Navbar";
import { useState } from "react";

export default function Home() {
  const [tabs, setTabs] = useState<string[]>([]);

  const handleAddTab = () => {
    const newTab = `Tab ${new Date().getTime()}`;
    setTabs((prev) => [...prev, newTab]);
  };

  const handleSortTabs = (sortedTabs: string[]) => {
    setTabs(sortedTabs);
  };

  return (
    <div>
      <button onClick={handleAddTab}>Add Tab</button>
      <Navbar tabs={tabs} onSortTabs={handleSortTabs} />
    </div>
  );
}
