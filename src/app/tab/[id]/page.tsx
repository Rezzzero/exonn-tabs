"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@components/Navbar";
import { useTabsStorage } from "../../storage/useTabStorage";
import { useTabActions } from "../../hooks/useTabHelper";

const TabPage = () => {
  const { tabs, setTabs } = useTabsStorage();
  const { handleAddTab, handleSortTabs, handleDeleteTab } =
    useTabActions(setTabs);

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
    <div className="container mx-auto flex items-center overflow-x-auto">
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
};

export default TabPage;
