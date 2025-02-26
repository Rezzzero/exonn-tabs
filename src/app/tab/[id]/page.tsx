// app/tab/[id]/page.tsx

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "../../storage/useTabStorage";

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
    const newTab = `Tab ${new Date().getTime()}`;
    setTabs((prev) => [...prev, newTab]);
  };

  const handleSortTabs = (sortedTabs: string[]) => {
    setTabs(sortedTabs);
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tab: {id}</h1>
      <p>Content for {id}</p>
      <div className="flex">
        <Navbar tabs={tabs} onSortTabs={handleSortTabs} />
        <button onClick={handleAddTab}>Add Tab</button>
      </div>
    </div>
  );
};

export default TabPage;
