import React from "react";
import { memo } from "react";
import { useAutoResizeTextarea } from "../hooks/useAutoResizeTextarea";

interface NotionInputBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const NotionInputBar = memo(
  ({ value, onChange, onKeyDown, onSubmit, disabled }: NotionInputBarProps) => {
    const textAreaRef = useAutoResizeTextarea(value);

    return (
      <div className="input-bar-wrapper">
        {/* Кнопка 1: Додати SVG */}
        <button className="icon-button side-button">
          <span className="text-2xl leading-none relative top-[-1px]">+</span>
        </button>

        {/* Центральна частина: Textarea */}
        <div className="textarea-container">
          <textarea
            ref={textAreaRef}
            className="styled-textarea"
            placeholder="Введіть ваш текст..."
            spellCheck="false"
            rows={1}
            onChange={onChange}
            value={value}
            onKeyDown={onKeyDown}
          />
        </div>

        {/* Кнопка 3: Відправити */}
        <button
          className="icon-button side-button"
          onClick={onSubmit}
          disabled={disabled}
        >
          <span>↑</span>
        </button>
      </div>
    );
  }
);
