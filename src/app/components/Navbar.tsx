"use client";

import { Tab } from "@components/Tab";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import React, { useState } from "react";

export const Navbar = ({
  tabs,
  onSortTabs,
}: {
  tabs: { title: string; url: string; fixed: boolean }[];
  onSortTabs: (
    sortedTabs: { title: string; url: string; fixed: boolean }[]
  ) => void;
}) => {
  const [activeContextTab, setActiveContextTab] = useState<string | null>(null);
  const handleSortEnd = (event: any) => {
    const { active, over } = event;

    if (active && over) {
      const oldIndex = tabs.findIndex((tab) => tab.url === active.id);
      const newIndex = tabs.findIndex((tab) => tab.url === over.id);

      if (oldIndex !== newIndex) {
        const updatedTabs = arrayMove(tabs, oldIndex, newIndex);
        onSortTabs(updatedTabs);
      }
    }
  };

  const handleContextMenu = (tabUrl: string) => {
    setActiveContextTab((prev) => (prev === tabUrl ? prev : tabUrl));
  };

  const handleCloseContextMenu = () => setActiveContextTab(null);

  const handleChangeTabFixed = (tabUrl: string) => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.url === tabUrl) {
        return { ...tab, fixed: !tab.fixed };
      }
      return tab;
    });
    onSortTabs(updatedTabs);
    handleCloseContextMenu();
  };

  const fixedTabs = tabs.filter((tab) => tab.fixed);
  const nonFixedTabs = tabs.filter((tab) => !tab.fixed);
  console.log(fixedTabs, nonFixedTabs);

  return (
    <DndContext onDragEnd={handleSortEnd}>
      <SortableContext items={fixedTabs.map((item) => item.url)}>
        <div className="flex">
          {fixedTabs.map((item) => (
            <Tab
              key={item.url}
              tab={item}
              onContextMenu={() => handleContextMenu(item.url)}
              showContextMenu={activeContextTab === item.url}
              closeContextMenu={handleCloseContextMenu}
              onChangeTabFixed={() => handleChangeTabFixed(item.url)}
            >
              {item.title}
            </Tab>
          ))}
        </div>
      </SortableContext>

      <SortableContext items={nonFixedTabs.map((item) => item.url)}>
        <div className="flex">
          {nonFixedTabs.map((item) => (
            <Tab
              key={item.url}
              tab={item}
              onContextMenu={() => handleContextMenu(item.url)}
              showContextMenu={activeContextTab === item.url}
              closeContextMenu={handleCloseContextMenu}
              onChangeTabFixed={() => handleChangeTabFixed(item.url)}
            >
              {item.title}
            </Tab>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
