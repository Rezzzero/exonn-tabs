"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "../../storage/useTabStorage";
import { useTabActions } from "../../hooks/useTabHelper";

const TabPage = () => {
  const { tabs, setTabs } = useTabsStorage();
  const { handleAddTab, handleSortTabs } = useTabActions(setTabs);

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

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center">
        <Navbar tabs={tabs} onSortTabs={handleSortTabs} />
        <button onClick={handleAddTab} className="font-medium text-2xl">
          +
        </button>
      </div>
    </div>
  );
};

export default TabPage;
