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
  onCancel?: () => void;
  isEditing?: boolean;
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
    onCancel,
    isEditing,
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

        <div className="flex items-center gap-2">
          {/* Кнопка СКАСУВАТИ: рендериться ТІЛЬКИ при редагуванні */}
          {isEditing && (
            <button
              className="icon-button side-button cancel-btn"
              onClick={onCancel}
              title="Скасувати (Esc)"
            >
              ✕
            </button>
          )}

          {/* Кнопка ВІДПРАВИТИ / ЗБЕРЕГТИ */}
          <button
            className="icon-button side-button"
            onClick={onSubmit}
            disabled={disabled}
          >
            <span>{isEditing ? "✅" : "↑"}</span>
          </button>
        </div>
      </div>
    );
  }
);
