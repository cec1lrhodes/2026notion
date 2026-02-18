import { useCallback, useState, useEffect } from "react";
import {
  useNotionStore,
  useEditingId,
  useSetEditingId,
  useAddCard,
  useUpdateCard,
} from "../store/useNotionStore";

export const useNotionInput = () => {
  // 1. Локальний стан для тексту та зображення (не викликає ререндер інших компонентів)
  const [data, setData] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 2. Отримуємо значення зі стору (підписка тільки на editingId)
  const editingId = useEditingId();

  // 3. Отримуємо екшени (вони стабільні, не викликають ререндерів)
  const setEditingId = useSetEditingId();
  const addCardToStore = useAddCard();
  const updateCardAction = useUpdateCard();

  // 4. Синхронізація при редагуванні
  useEffect(() => {
    if (editingId) {
      // Отримуємо актуальні дані картки без підписки на весь масив cards
      const card = useNotionStore
        .getState()
        .cards.find((c) => c.id === editingId);

      if (card) {
        setData(card.text);
        setSelectedImage(card.svg ?? null);
      }
    } else {
      setData("");
      setSelectedImage(null);
    }
  }, [editingId]);

  // 5. Обробники подій (всі в useCallback для стабільності пропсів)
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData(e.target.value);
    },
    [],
  );

  const handleImageChange = useCallback((url: string | null) => {
    setSelectedImage(url);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingId(null);
  }, [setEditingId]);

  const handleAddCard = useCallback(() => {
    const trimmedData = data.trim();
    if (!trimmedData && !selectedImage) return;

    if (editingId) {
      updateCardAction(editingId, trimmedData, selectedImage);
      setEditingId(null);
    } else {
      addCardToStore(trimmedData, selectedImage);
    }

    // Очищення після успішної дії
    setData("");
    setSelectedImage(null);
  }, [
    data,
    selectedImage,
    editingId,
    addCardToStore,
    updateCardAction,
    setEditingId,
  ]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleAddCard();
      }
      if (e.key === "Escape") {
        cancelEditing();
      }
    },
    [handleAddCard, cancelEditing],
  );

  return {
    data,
    selectedImage,
    handleChange,
    handleKeyDown,
    addCard: handleAddCard,
    handleImageChange,
    cancelEditing,
    isEditing: !!editingId,
  };
};
