import { memo } from "react";

interface NotionIconButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Сюди передамо іконку (✎ або ✕)
  variant?: "primary" | "danger"; // Тип кнопки
  className?: string; // Для додаткових стилів, якщо треба
}

export const NotionIconButton = memo(
  ({
    onClick,
    children,
    variant = "primary",
    className = "",
  }: NotionIconButtonProps) => {
    const baseStyles =
      "p-2 rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center";

    const variantStyles =
      variant === "danger"
        ? "bg-zinc-900/80 text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
        : "bg-zinc-900/80 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // "Зашиваємо" зупинку спливання тут
      onClick();
    };
    return (
      <button
        className={`${baseStyles} ${variantStyles} ${className}`}
        onClick={handleClick}
        type="button"
      >
        {children}
      </button>
    );
  }
);
//   className={`${baseStyles} ${variantStyles} ${className}`} | hardCode + потенційна гнучкість через className
