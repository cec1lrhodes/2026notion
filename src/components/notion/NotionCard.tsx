import React, { memo } from "react";
import { type Card } from "./types/type";

interface NotionCardProps {
  item: Card;
  onDelete: (id: string) => void;
}

const NotionCard: React.FC<NotionCardProps> = ({ item, onDelete }) => (
  <div className="result-card group relative">
    <button className="delete-btn" onClick={() => onDelete(item.id)}>
      <span>✕</span>
    </button>
    <div className="card-image-placeholder">
      <span>SVG image</span>
    </div>
    <div className="card-description">
      <p className="truncate">{item.text}</p>
    </div>
  </div>
);

export default memo(NotionCard);
