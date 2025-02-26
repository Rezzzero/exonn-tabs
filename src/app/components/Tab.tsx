import { useSortable } from "@dnd-kit/sortable";

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
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: `translate3d(${transform?.x ?? 0}px, ${
          transform?.y ?? 0
        }px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        padding: "10px 20px",
        margin: "5px",
        backgroundColor: "lightblue",
        cursor: "grab",
      }}
    >
      {children}
    </div>
  );
};
