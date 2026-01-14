import React, { memo, useState } from "react";
import { type Card } from "./types/type";
import { NotionIconButton } from "./ui/buttonsNotion/NotionIconButton";

interface NotionCardProps {
  item: Card;
  onDelete: (id: string) => void;
  onEdit: (card: Card) => void;
}

const NotionCard: React.FC<NotionCardProps> = ({ item, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullView, setIsFullView] = useState(false);

  const toggleFullView = () => setIsFullView((prev) => !prev);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const gridClasses = isExpanded
    ? "h-[500px] z-20 ring-1 ring-zinc-700 shadow-2xl scale-[1.01]"
    : "h-[320px] z-10";

  const fullViewClasses =
    "fixed inset-x-[5%] top-[5%] h-[90%] z-50 ring-2 ring-blue-500 shadow-[0_0_0_100vmax_rgba(0,0,0,0.85)] scale-100";

  const firstLine = item.text.split("\n")[0];

  return (
    <div
      className={`
        result-card group transition-all duration-500 ease-in-out border border-zinc-800 bg-zinc-900 rounded-xl overflow-hidden flex flex-col
        ${isFullView ? fullViewClasses : `relative ${gridClasses}`}
      `}
    >
      {/* --- ЗОБРАЖЕННЯ --- */}
      <div
        className={`w-full relative shrink-0 transition-all duration-500 ${
          isFullView ? "h-[300px]" : isExpanded ? "h-[200px]" : "h-[140px]"
        }`}
      >
        {item.svg ? (
          <img
            src={item.svg}
            alt="Visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center">
            <span className="text-zinc-700 text-xs italic">No image</span>
          </div>
        )}

        {/* Кнопка "На весь екран" */}
        <div className="absolute top-2 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <NotionIconButton onClick={toggleFullView}>
            {isFullView ? (
              // Іконка "Згорнути" (дві стрілки всередину)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
              </svg>
            ) : (
              // Іконка "Розширити" (дві стрілки назовні)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6" />
                <path d="M9 21H3v-6" />
                <path d="M21 3l-7 7" />
                <path d="M3 21l7-7" />
              </svg>
            )}
          </NotionIconButton>
        </div>

        {/* Кнопки Edit/Delete */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
          <NotionIconButton onClick={() => onEdit(item)} variant="primary">
            ✎
          </NotionIconButton>

          <NotionIconButton onClick={() => onDelete(item.id)} variant="danger">
            ✕
          </NotionIconButton>
        </div>
      </div>

      {/* --- КОНТЕНТ (Текст) --- */}
      <div className="flex-1 flex flex-col p-4 min-h-0">
        <div
          className={`
            text-zinc-300 text-sm leading-relaxed w-full custom-scrollbar
            ${
              isExpanded || isFullView
                ? "overflow-y-auto pr-2 whitespace-pre-wrap"
                : "overflow-hidden"
            }
          `}
        >
          {/* Якщо FullView або Expanded - показуємо повний текст, інакше заголовок */}
          {isExpanded || isFullView ? (
            <span className={isFullView ? "text-base" : ""}>{item.text}</span>
          ) : (
            <p className="font-bold text-base truncate text-zinc-100">
              {firstLine || "Untitled"}
            </p>
          )}
        </div>

        {!isExpanded && !isFullView && item.text.length > firstLine.length && (
          <p className="text-xs text-zinc-500 mt-2">More content inside...</p>
        )}
      </div>

      {/* --- КНОПКА ВНИЗУ --- */}
      <button
        onClick={isFullView ? toggleFullView : toggleExpand}
        className="w-full py-3 bg-zinc-800/30 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 text-xs font-medium uppercase tracking-wider transition-colors border-t border-zinc-800/50"
      >
        {isFullView ? "Exit Full Screen" : isExpanded ? "Close" : "Open"}
      </button>
    </div>
  );
};

export default memo(NotionCard);
