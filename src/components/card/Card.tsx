import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faCheck,
  faTimes,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useDrag } from "react-dnd";
import { CardProps } from "../../types/types.model";
import styles from "./Card.module.css";

const Card: React.FC<CardProps> = ({
  cardId,
  cardTitle,
  cardDescription,
  columnId,
  removeCard,
  updateCardDescription,
  setCardTitle,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { cardId, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(cardDescription || "");

  useEffect(() => {
    setTempDescription(cardDescription || "");
  }, [cardDescription]);

  const handleSetTitle = () => {
    const newTitle = prompt("Enter a task title: ", cardTitle);
    if (newTitle) {
      setCardTitle(cardId, newTitle);
    }
  };

  const handleConfirmEdit = () => {
    updateCardDescription(cardId, tempDescription);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempDescription(cardDescription || "");
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="card bg-gray-200 p-2 rounded-md shadow-sm relative"
    >
      <div className="flex flex-row items-center mb-1">
        <p className="mb-0 font-bold">{cardTitle || "New Card"}</p>
        <FontAwesomeIcon
          onClick={() => handleSetTitle()}
          icon={faPen}
          className="text-black m-3 text-base"
        />
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="w-full p-1 border rounded"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <FontAwesomeIcon
              onClick={handleConfirmEdit}
              icon={faCheck}
              className="text-green-600 cursor-pointer"
            />
            <FontAwesomeIcon
              onClick={handleCancelEdit}
              icon={faTimes}
              className="text-red-600 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div>
          <p className={`${styles.breakword} max-w-[150px]`}>
            {cardDescription || "No description"}
          </p>
          <FontAwesomeIcon
            onClick={() => setIsEditing(true)}
            icon={faPlus}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      )}

      <FontAwesomeIcon
        onClick={() => removeCard(cardId)}
        icon={faTrash}
        className="text-rose-600 ml-2 text-base top-0 right-0 m-3 absolute cursor-pointer"
      />
    </div>
  );
};

export default Card;
