import React, { memo } from "react";
import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import { UploadImageButton } from "./ui/buttonsNotion/UploadImageButton";
import { useNotion } from "../../hooks/useNotion";

export const NotionInputBar = memo(() => {
  const {
    data,
    handleChange,
    handleKeyDown,
    addCard,
    selectedImage,
    handleImageChange,
    cancelEditing,
    isEditing,
  } = useNotion();

  const textAreaRef = useAutoResizeTextarea(data);
  const disabled = data.trim().length === 0;

  return (
    <div className="input-bar-wrapper">
      {/* Кнопка 1: Додати SVG */}
      <UploadImageButton
        onImageSelect={handleImageChange}
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
          onChange={handleChange}
          value={data}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Кнопка СКАСУВАТИ: рендериться ТІЛЬКИ при редагуванні */}
        {isEditing && (
          <button
            className="icon-button side-button cancel-btn"
            onClick={cancelEditing}
            title="Скасувати (Esc)"
          >
            ✕
          </button>
        )}

        {/* Кнопка ВІДПРАВИТИ / ЗБЕРЕГТИ */}
        <button
          className="icon-button side-button"
          onClick={addCard}
          disabled={disabled}
        >
          <span>{isEditing ? "✅" : "↑"}</span>
        </button>
      </div>
    </div>
  );
});
