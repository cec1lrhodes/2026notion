import { useState, useEffect, useCallback } from "react";
import { type Card } from "../components/notion/types/type";

interface UseNotionCardProps {
  item: Card;
  onEdit: (card: Card) => void;
  onUpdate: (id: string, text: string, svg?: string | null) => void;
  onCancelGlobalEdit: () => void;
}

export const useCardLogic = ({
  item,
  onEdit,
  onUpdate,
  onCancelGlobalEdit,
}: UseNotionCardProps) => {
  // 1. UI States
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullView, setIsFullView] = useState(false);

  // 2. Editing Logic
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [draftText, setDraftText] = useState(item.text);

  useEffect(() => {
    setDraftText(item.text);
  }, [item.text]);

  const toggleExpand = useCallback(() => setIsExpanded((prev) => !prev), []);

  const toggleFullView = useCallback(() => {
    if (!isFullView) {
      onCancelGlobalEdit();
    }

    setIsFullView((prev) => !prev);

    if (isFullView) {
      setIsInlineEditing(false);
    }
  }, [isFullView, onCancelGlobalEdit]);

  const handleEditClick = useCallback(() => {
    if (isFullView) {
      setIsInlineEditing(true);
    } else {
      onEdit(item); // Глобальне редагування
    }
  }, [isFullView, item, onEdit]);

  const handleSaveDraft = useCallback(() => {
    onUpdate(item.id, draftText, item.svg);
    setIsInlineEditing(false);
  }, [item.id, draftText, item.svg, onUpdate]);

  const handleCancelDraft = useCallback(() => {
    setDraftText(item.text);
    setIsInlineEditing(false);
  }, [item.text]);

  const handleDraftChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDraftText(e.target.value);
    },
    []
  );

  return {
    state: {
      isExpanded,
      isFullView,
      isInlineEditing,
      draftText,
    },
    actions: {
      toggleExpand,
      toggleFullView,
      handleEditClick,
      handleSaveDraft,
      handleCancelDraft,
      handleDraftChange,
    },
  };
};
