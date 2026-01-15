import React, { memo } from "react";

interface CardContentSectionProps {
  text: string;
  internalText: string;
  isInternalEditing: boolean;
  isExpanded: boolean;
  isFullView: boolean;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CardContentSection = memo(
  ({
    text,
    internalText,
    isInternalEditing,
    isExpanded,
    isFullView,
    onTextChange,
  }: CardContentSectionProps) => {
    const firstLine = text.split("\n")[0];
    const scrollClass =
      isExpanded || isFullView ? "overflow-y-auto pr-2" : "overflow-hidden";
    const textClass = isFullView
      ? "text-base whitespace-pre-wrap"
      : "whitespace-pre-wrap";

    return (
      <div className="flex-1 flex flex-col p-4 min-h-0 relative">
        <div
          className={`text-zinc-300 text-sm leading-relaxed w-full custom-scrollbar h-full ${scrollClass}`}
        >
          {isInternalEditing ? (
            <textarea
              autoFocus
              value={internalText}
              onChange={onTextChange}
              className="w-full h-full bg-transparent text-zinc-100 resize-none outline-none border-none font-mono text-base p-0 m-0"
              placeholder="Start typing..."
            />
          ) : isExpanded || isFullView ? (
            <span className={textClass}>{text}</span>
          ) : (
            <p className="font-bold text-base truncate text-zinc-100">
              {firstLine || "Untitled"}
            </p>
          )}
        </div>
      </div>
    );
  }
);
