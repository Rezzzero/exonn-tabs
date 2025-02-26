"use client";

import { Tab } from "@components/Tab";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { TabType } from "../types";
import SettingsIcon from "@mui/icons-material/Settings";

export const Navbar = ({
  tabs,
  onSortTabs,
  handleDeleteTab,
}: {
  tabs: TabType[];
  onSortTabs: (sortedTabs: TabType[]) => void;
  handleDeleteTab: (tabUrl: string) => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType | null>(null);

  const handleMouseEnter = (tab: TabType) => {
    if (tab.fixed) {
      setActiveTab(tab);
      setIsModalVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsModalVisible(false);
  };

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

  return (
    <>
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
                handleDeleteTab={() => handleDeleteTab(item.url)}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
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
                handleDeleteTab={() => handleDeleteTab(item.url)}
              >
                {item.title}
              </Tab>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isModalVisible && activeTab && (
        <div className="fixed top-12 left-12 bg-white rounded-lg shadow-lg p-5 z-50">
          <div className="flex items-center">
            <SettingsIcon />
            <h2 className="text-xl font-semibold">{activeTab.title}</h2>
          </div>
        </div>
      )}
    </>
  );
};
