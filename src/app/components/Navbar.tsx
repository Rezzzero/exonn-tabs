"use client";

import { Tab } from "@components/Tab";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

export const Navbar = ({
  tabs,
  onSortTabs,
}: {
  tabs: string[];
  onSortTabs: (sortedTabs: string[]) => void;
}) => {
  const handleSortEnd = (event: any) => {
    const { active, over } = event;

    if (active && over) {
      const oldIndex = tabs.indexOf(active.id);
      const newIndex = tabs.indexOf(over.id);

      if (oldIndex !== newIndex) {
        const updatedTabs = arrayMove(tabs, oldIndex, newIndex);
        console.log("Updated tabs after drag:", updatedTabs);
        onSortTabs(updatedTabs);
      }
    }
  };
  return (
    <DndContext onDragEnd={handleSortEnd}>
      <SortableContext items={tabs}>
        <div>
          {tabs.map((item, index) => (
            <Tab key={item} tab={item}>
              {item}
            </Tab>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
