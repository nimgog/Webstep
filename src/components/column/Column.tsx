import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Column.module.css";
import { useDrop } from "react-dnd";
import { ColumnProps } from "../../types/types.model";
import Card from "../card/Card";

const Column: React.FC<ColumnProps> = ({
  columnId,
  removeColumn,
  onDrop,
  columnTitle,
  cards,
  addCard,
  removeCard,
  changeColumnTitle,
  updateCardDescription,
  setCardTitle,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (card: { cardId: string; sourceColumnId: string }) => {
      console.log(
        "Card dropped:",
        card.cardId,
        "Target Column ID:",
        columnId,
        "Source Column ID:",
        card.sourceColumnId
      );
      onDrop(card.cardId, card.sourceColumnId, columnId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleTitleChange = () => {
    const newTitle = prompt("Enter a new title:", columnTitle);
    if (newTitle) {
      changeColumnTitle(newTitle);
    }
  };

  return (
    <div
      ref={drop}
      className={`${styles.board__column} bg-white p-4 rounded-lg shadow-md relative`}
    >
      <FontAwesomeIcon
        onClick={() => removeColumn()}
        icon={faTrash}
        className="text-rose-600 m-3 text-base absolute top-0 right-0"
      />
      <div className="flex flex-row items-center mb-1">
        <h3 className="text-lg font-bold mb-0">{columnTitle}</h3>
        <FontAwesomeIcon
          onClick={() => handleTitleChange()}
          icon={faPen}
          className="text-black m-3 text-base"
        />
      </div>
      <button
        onClick={addCard}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Card
      </button>
      <div className="space-y-2 mt-4">
        {cards.map((card) => (
          <Card
            key={card.cardId}
            cardId={card.cardId}
            cardTitle={card.cardTitle}
            cardDescription={card.cardDescription} 
            columnId={columnId}
            removeCard={() => removeCard(card.cardId)}
            updateCardDescription={updateCardDescription}
            setCardTitle={setCardTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
