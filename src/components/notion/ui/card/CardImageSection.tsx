import React, { memo } from "react";
import { NotionIconButton } from "../buttonsNotion/NotionIconButton";
import { type Card } from "../../types/type";

interface CardImageSectionProps {
  svg?: string;
  heightClass: string;
  isFullView: boolean;
  isInternalEditing: boolean;
  onToggleFullView: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const CardImageSection = memo(
  ({
    svg,
    heightClass,
    isFullView,
    isInternalEditing,
    onToggleFullView,
    onEditClick,
    onDeleteClick,
  }: CardImageSectionProps) => {
    return (
      <div
        className={`w-full relative shrink-0 transition-all duration-500 ${heightClass}`}
      >
        {svg ? (
          <img src={svg} alt="Visual" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center">
            <span className="text-zinc-700 text-xs italic">No image</span>
          </div>
        )}

        {/* Кнопка Full Screen */}
        <div className="absolute top-2 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isInternalEditing && (
            <NotionIconButton
              onClick={onToggleFullView}
              className="w-7 h-7 p-1"
            >
              {isFullView ? "↙" : "↗"} {/* Тут можна повернути SVG іконки */}
            </NotionIconButton>
          )}
        </div>

        {/* Кнопки Edit/Delete */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
          {!isInternalEditing && (
            <>
              <NotionIconButton
                onClick={onEditClick}
                variant="primary"
                className="w-8 h-8 p-1.5"
              >
                ✎
              </NotionIconButton>
              <NotionIconButton
                onClick={onDeleteClick}
                variant="danger"
                className="w-8 h-8 p-1.5"
              >
                ✕
              </NotionIconButton>
            </>
          )}
        </div>
      </div>
    );
  }
);
