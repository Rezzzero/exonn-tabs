"use client";

import { words } from "../../constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "../../storage/useTabStorage";

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const TabPage = () => {
  const { tabs, setTabs } = useTabsStorage();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const pathId = pathname?.split("/").pop();
    const queryId = searchParams.get("id");

    if (pathId) {
      setId(pathId);
    } else if (queryId) {
      setId(queryId);
    }
  }, [pathname, searchParams]);

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

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex">
        <Navbar tabs={tabs} onSortTabs={handleSortTabs} />
        <button onClick={handleAddTab}>Add Tab</button>
      </div>
    </div>
  );
};

export default TabPage;
