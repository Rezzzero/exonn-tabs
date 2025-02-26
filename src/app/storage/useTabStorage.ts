import { useState, useEffect } from "react";

export const useTabsStorage = () => {
  const [tabs, setTabs] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedTabs = localStorage.getItem("tabs");
      return savedTabs ? JSON.parse(savedTabs) : [];
    }
    return [];
  });

  useEffect(() => {
    if (tabs.length > 0) {
      localStorage.setItem("tabs", JSON.stringify(tabs));
    }
  }, [tabs]);

  return { tabs, setTabs };
};
