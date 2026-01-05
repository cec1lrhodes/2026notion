import React from "react";

interface NotionInputBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const NotionInputBar: React.FC<NotionInputBarProps> = ({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  disabled,
}) => {
  return (
    <div className="input-bar-wrapper">
      {/* Кнопка 1: Додати SVG */}
      <button className="icon-button side-button">
        <span className="text-2xl leading-none relative top-[-1px]">+</span>
      </button>

      {/* Центральна частина: Textarea */}
      <div className="textarea-container">
        <textarea
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
};
