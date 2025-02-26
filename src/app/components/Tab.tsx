"use client";

import SettingsIcon from "@mui/icons-material/Settings";
import { useSortable } from "@dnd-kit/sortable";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TabType } from "../types";

export const Tab = ({
  tab,
  children,
  onContextMenu,
  showContextMenu,
  closeContextMenu,
  onChangeTabFixed,
}: {
  tab: TabType;
  children: React.ReactNode;
  onContextMenu: () => void;
  showContextMenu: boolean;
  closeContextMenu: () => void;
  onChangeTabFixed: (tabUrl: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: tab.url });
  const pathname = usePathname();
  const tabRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showContextMenu &&
        tabRef.current &&
        !tabRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showContextMenu, closeContextMenu]);

  if (!mounted) return null;

  return (
    <div ref={tabRef}>
      <Link href={`/tab/${tab.url}`} passHref>
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          onContextMenu={(e) => {
            e.preventDefault();
            onContextMenu();
          }}
          style={{
            transform: `translate3d(${transform?.x ?? 0}px, ${
              transform?.y ?? 0
            }px, 0)`,
            opacity: isDragging ? 0.5 : 1,
            backgroundColor: isDragging ? "#7F858D" : "#F4F7F9",
            cursor: "grab",
          }}
          className={`flex items-center font-medium
             px-7 py-4 cursor-pointer ${
               pathname?.endsWith(tab.url)
                 ? "border-t-2 border-blue-500 text-black"
                 : "hover:text-black"
             } ${isDragging ? "text-white" : "text-gray-500"}`}
        >
          <SettingsIcon />
          {!tab.fixed && children}
        </div>
      </Link>

      {showContextMenu && (
        <div className="absolute bg-white border shadow rounded p-2 mt-2">
          <button onClick={() => onChangeTabFixed(tab.url)}>
            {tab.fixed ? "Tab löschen" : "Tab anpinnen"}
          </button>
        </div>
      )}
    </div>
  );
};
