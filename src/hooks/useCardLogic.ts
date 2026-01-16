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
  const [draftText, setDraftText] = useState(item.text); // передаємо весь текст з нерозширеної картки

  // слідкує за актуальністю даних для обох інпутів
  useEffect(() => {
    setDraftText(item.text);
  }, [item.text]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isInlineEditing) {
          handleCancelDraft();
        } else if (isFullView) {
          toggleFullView();
        }
      }
    };
    if (isFullView || isInlineEditing) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullView, isInlineEditing]);

  const handlerContainerClick = useCallback(() => {
    const selectionText = window.getSelection();
    if (selectionText && selectionText?.toString().length > 0) {
      return;
    }

    if (!isFullView) {
      setIsExpanded((prev) => !prev);
    }
  }, [isFullView]);

  const toggleExpand = useCallback(() => setIsExpanded((prev) => !prev), []);
  // 1 Перемикач єкрану
  const toggleFullView = useCallback(() => {
    if (!isFullView) {
      onCancelGlobalEdit(); // прибирає інпут в нерозширеній картці
    }

    setIsFullView((prev) => !prev);

    if (isFullView) {
      setIsInlineEditing(false); // вимикаємо редагування при закриті
    }
  }, [isFullView, onCancelGlobalEdit]);

  // 2 редагування інпутів
  const handleEditClick = useCallback(() => {
    if (isFullView) {
      // локальне редагування, коли на повному єкрані
      setIsInlineEditing(true);
    } else {
      // Глобальний інпут сітки
      onEdit(item);
    }
  }, [isFullView, item, onEdit]);

  // 3 дані з draft передаються в глобальний інпут -> відповідно дані актуальні при обох редагуваннях
  const handleSaveDraft = useCallback(() => {
    onUpdate(item.id, draftText, item.svg);
    setIsInlineEditing(false);
  }, [item.id, draftText, item.svg, onUpdate]);

  // 4 скидає чернетку до оригіналу input item.text, при натискані відміни - Cancel
  const handleCancelDraft = useCallback(() => {
    setDraftText(item.text);
    setIsInlineEditing(false);
  }, [item.text]);

  // 5
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
      handlerContainerClick,
    },
  };
};
