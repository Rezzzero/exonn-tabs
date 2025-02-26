"use client";

import { useSortable } from "@dnd-kit/sortable";
import Link from "next/link";

export const Tab = ({
  tab,
  children,
}: {
  tab: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: tab });

  return (
    <Link href={`/tab/${tab}`} passHref>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          transform: `translate3d(${transform?.x ?? 0}px, ${
            transform?.y ?? 0
          }px, 0)`,
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isDragging ? "#7F858D" : "#F4F7F9",
          color: isDragging ? "white" : "black",
          cursor: "grab",
        }}
        className="p-4 text-gray-500 hover:text-black cursor-pointer"
      >
        {children}
      </div>
    </Link>
  );
};
