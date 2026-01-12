import React, { memo } from "react";
import { type Card } from "./types/type";

interface NotionCardProps {
  item: Card;
  onDelete: (id: string) => void;
  onEdit: (card: Card) => void;
}

const NotionCard: React.FC<NotionCardProps> = ({ item, onDelete, onEdit }) => {
  const firstLine = item.text.split("\n")[0];

  return (
    <div className="result-card group relative">
      <button className="delete-btn" onClick={() => onDelete(item.id)}>
        <span>✕</span>
      </button>

      <button className="edit-btn" onClick={() => onEdit(item)}>
        <span>✎</span>
      </button>

      <div className="card-image-placeholder">
        {item.svg ? (
          <img
            src={item.svg}
            alt="Card visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-zinc-700 italic">No image</span>
        )}
      </div>

      <div className="card-description">
        <p className="truncate font-medium text-zinc-300">
          {firstLine || "No description"}
        </p>
      </div>
    </div>
  );
};

export default memo(NotionCard);
