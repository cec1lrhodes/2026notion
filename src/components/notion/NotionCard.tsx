import React, { memo, useEffect } from "react";
import { type Card } from "./types/type";
import { CardContentSection } from "./ui/card/CardContentSection";
import { CardFooter } from "./ui/card/CardFooter";
import { CardImageSection } from "./ui/card/CardImageSection";
import { useCardLogic } from "../../hooks/useCardLogic";
import { useNotionCards } from "../../hooks/useNotionCards";
import { useCardEditing } from "../../hooks/useCardEditing";
import { useDeleteCard, useUpdateCard } from "../../store/useNotionStore";

interface NotionCardProps {
  item: Card;
}

const NotionCard: React.FC<NotionCardProps> = ({ item }) => {
  useEffect(() => {
    console.log("🔵 NotionCard RENDERED, id:", item.id);
  });

  // Доменні дії над картками (CRUD)
  const deleteCard = useDeleteCard();
  const onUpdateCard = useUpdateCard();

  // Логіка вибору картки для редагування (editingId в сторі)
  const { startEditing, cancelEditing } = useCardEditing();

  const { state, actions } = useCardLogic({
    item,
    onEdit: () => startEditing(item),
    onUpdate: (id, text, svg) => onUpdateCard(id, text, svg ?? null),
    onCancelGlobalEdit: cancelEditing,
  });

  const gridClasses = state.isExpanded
    ? "h-[500px] z-20 ring-1 ring-zinc-700 shadow-2xl scale-[1.01]"
    : "h-[320px] z-10";
  const fullViewClasses =
    "fixed inset-x-[5%] top-[5%] h-[90%] z-50 ring-2 ring-blue-500 shadow-[0_0_0_100vmax_rgba(0,0,0,0.9)] backdrop-blur-sm scale-100";
  const heightClass = state.isFullView
    ? "h-[300px]"
    : state.isExpanded
      ? "h-[200px]"
      : "h-[140px]";

  const displayText = state.isInlineEditing ? state.draftText : item.text;

  return (
    <div
      onClick={actions.handlerContainerClick}
      className={`result-card group transition-all duration-500 ease-in-out border border-zinc-800 bg-zinc-900 rounded-xl overflow-hidden flex flex-col ${
        state.isFullView ? fullViewClasses : `relative ${gridClasses}`
      }`}
    >
      <CardImageSection
        svg={item.svg}
        heightClass={heightClass}
        isFullView={state.isFullView}
        isInternalEditing={state.isInlineEditing}
        onToggleFullView={actions.toggleFullView}
        onEditClick={actions.handleEditClick}
        onDeleteClick={() => deleteCard(item.id)}
      />

      <CardContentSection
        text={displayText}
        internalText={state.draftText}
        isInternalEditing={state.isInlineEditing}
        isExpanded={state.isExpanded}
        isFullView={state.isFullView}
        onTextChange={actions.handleDraftChange}
      />

      <CardFooter
        isInternalEditing={state.isInlineEditing}
        isFullView={state.isFullView}
        isExpanded={state.isExpanded}
        onSave={actions.handleSaveDraft}
        onCancel={actions.handleCancelDraft}
        onToggleView={
          state.isFullView ? actions.toggleFullView : actions.toggleExpand
        }
      />
    </div>
  );
};
export default memo(NotionCard);
