import React from "react";
import Column from "../column/Column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Board.module.css";
import { BoardProps } from "../../types/types.model";
import { useDragDropContext } from "../../context/DragDropContext";

const Board: React.FC<BoardProps> = ({
  boardId,
  boardTitle,
  deleteBoard,
  setTitle,
  columns,
  addColumn,
  removeColumn,
  changeColumnTitle,
  addCardToColumn,
  removeCardFromColumn,
  updateCardDescription
}) => {
  const { moveCard } = useDragDropContext();

  const handleSetTitle = () => {
    const newTitle = prompt("Enter a new title:", boardTitle);
    if (newTitle) {
      setTitle(boardId, newTitle);
    }
  };

  const handleDeleteBoard = () => {
    const confirmation = prompt(
      "The delete action is irreversible. To confirm type: DELETE"
    );
    if (confirmation === "DELETE") {
      deleteBoard(boardId);
    }
  };

  const handleDrop = (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => {
    moveCard(cardId, sourceColumnId, targetColumnId);
  };

  return (
    <div
      className={`${styles.boardpage__board} bg-gray-100 p-4 rounded-lg shadow-lg w-full relative`}
    >
      <div className="absolute top-0 left-0 w-full p-3">
        <div className="flex flex-row w-full justify-start items-center mb-1">
          <h2 className="text-xl font-bold text-black mb-0">{boardTitle}</h2>
          <div className="">
            <FontAwesomeIcon
              onClick={handleSetTitle}
              icon={faPen}
              className="text-black ml-2 text-base"
            />
            <FontAwesomeIcon
              onClick={handleDeleteBoard}
              icon={faTrash}
              className="text-rose-600 ml-2 text-base"
            />
          </div>
        </div>
        <button
          onClick={() => addColumn(boardId)}
          className="bg-green-500 text-white px-4 py-2 rounded text-xs"
        >
          Add Column
        </button>
      </div>

      <div className="flex space-x-4 mt-20">
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            key={columnId}
            columnId={columnId}
            columnTitle={column.columnTitle}
            removeColumn={() => removeColumn(boardId, columnId)}
            onDrop={(cardId, targetColumnId) =>
              handleDrop(cardId, columnId, targetColumnId)
            }
            cards={Object.values(column.cards)}
            addCard={() => addCardToColumn(boardId, columnId)}
            removeCard={(cardId) =>
              removeCardFromColumn(boardId, columnId, cardId)
            }
            updateCardDescription={(cardId: string, newDescription: string) =>
              updateCardDescription(boardId, columnId, cardId, newDescription)
            }
            changeColumnTitle={(newTitle: string) =>
              changeColumnTitle(boardId, columnId, newTitle) 
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
