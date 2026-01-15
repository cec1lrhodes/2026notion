import React, { memo } from "react";

interface CardFooterProps {
  isInternalEditing: boolean;
  isFullView: boolean;
  isExpanded: boolean;
  onSave: () => void;
  onCancel: () => void;
  onToggleView: () => void;
}

export const CardFooter = memo(
  ({
    isInternalEditing,
    isFullView,
    isExpanded,
    onSave,
    onCancel,
    onToggleView,
  }: CardFooterProps) => {
    if (isInternalEditing) {
      return (
        <div className="flex w-full border-t border-zinc-800/50">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-zinc-800/50 hover:bg-red-900/30 text-zinc-400 hover:text-red-400 transition-colors font-medium text-xs uppercase"
          >
            Cancel
          </button>
          <div className="w-[1px] bg-zinc-700"></div>
          <button
            onClick={onSave}
            className="flex-1 py-3 bg-zinc-800/50 hover:bg-green-900/30 text-zinc-400 hover:text-green-400 transition-colors font-bold text-xs uppercase"
          >
            Save Changes
          </button>
        </div>
      );
    }

    return (
      <div className="border-t border-zinc-800/50">
        <button
          onClick={onToggleView}
          className="w-full py-3 bg-zinc-800/30 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 text-xs font-medium uppercase tracking-wider transition-colors"
        >
          {isFullView ? "Exit Full Screen" : isExpanded ? "Close" : "Open"}
        </button>
      </div>
    );
  }
);
