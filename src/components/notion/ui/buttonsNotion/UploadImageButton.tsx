import React, { memo, useRef } from "react";

interface UploadImageButtonProps {
  onImageSelect: (url: string | null) => void;
  currentImage: string | null;
}

export const UploadImageButton = memo(
  ({ onImageSelect, currentImage }: UploadImageButtonProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const maxSize = 1 * 1024 * 1024; // 1mb

      if (file.size > maxSize) {
        alert("Файл більший за 1мб");
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageSelect(reader.result as string); // Перетворюємо у Base64 для localStorage
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="relative">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
        />
        <button
          type="button"
          className={`icon-button side-button ${
            currentImage ? "border-green-500 border" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          {/* Якщо фото обрано, показуємо маленьку превьюшку або інший символ */}
          {currentImage ? (
            <img
              src={currentImage}
              className="w-full h-full object-cover rounded-lg"
              alt="preview"
            />
          ) : (
            <span className="text-2xl leading-none relative top-[-1px]">+</span>
          )}
        </button>

        {currentImage && (
          <button
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onImageSelect(null);
            }}
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);
