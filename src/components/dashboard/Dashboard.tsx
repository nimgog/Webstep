import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardProps } from "../../types/types.model";



const Dashboard: React.FC<DashboardProps> = ({
  boards,
  addBoard,
  setBoardTitle,
  deleteBoard,
}) => {
  const navigate = useNavigate();

  const handleBoardClick = (boardId: number) => {
    navigate(`/board/${boardId}`);
  };

  const handleSetTitle = (id: number) => {
    const newTitle = prompt("Enter a new title:");
    if (newTitle) {
      setBoardTitle(id, newTitle);
    }
  };

  const handleDeleteBoard = (boardId: number) => {
    const confirmation = prompt(
      "The delete action is irreversible. To confirm type: DELETE"
    );
    if (confirmation === "DELETE") {
      deleteBoard(boardId);
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <button
        onClick={addBoard} 
        className="bg-blue-500 text-white px-4 py-2 rounded text-xs"
      >
        Add Board
      </button>

      <div className="flex space-x-4 mt-4">
        {boards.map((board) => (
          <div
            key={board.boardId}
            onClick={() => handleBoardClick(board.boardId)}
            className="w-40 h-40 bg-gray-300 text-center flex items-center justify-center rounded cursor-pointer relative"
          >
            <div className="w-[40px] h-[40px] absolute top-0 right-0 flex items-center justify-center">
              <FontAwesomeIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBoard(board.boardId);
                }}
                icon={faTrash}
                className="text-rose-600 ml-2 text-base"
              />
            </div>
            <div>
              <span className="text-lg font-semibold">{board.boardTitle}</span>
              <FontAwesomeIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleSetTitle(board.boardId);
                }}
                icon={faPen}
                className="text-black ml-2 text-base"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
