import React from "react";
import { memo } from "react";
import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import { UploadImageButton } from "./ui/buttonsNotion/UploadImageButton";

interface NotionInputBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  disabled: boolean;
  selectedImage: string | null;
  onImageSelect: (url: string | null) => void;
}

export const NotionInputBar = memo(
  ({
    value,
    onChange,
    onKeyDown,
    onSubmit,
    disabled,
    onImageSelect,
    selectedImage,
  }: NotionInputBarProps) => {
    const textAreaRef = useAutoResizeTextarea(value);

    return (
      <div className="input-bar-wrapper">
        {/* Кнопка 1: Додати SVG */}
        <UploadImageButton
          onImageSelect={onImageSelect}
          currentImage={selectedImage}
        />

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
