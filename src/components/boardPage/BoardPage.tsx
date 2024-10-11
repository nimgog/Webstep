import { useNavigate, useParams } from "react-router-dom";
import Board from "../board/Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BoardPageProps } from "../../types/types.model";

const BoardPage: React.FC<BoardPageProps> = ({
  boards,
  deleteBoard,
  setBoardTitle,
  addColumnToBoard,
  removeColumnFromBoard,
  changeColumnTitle,
  addCardToColumn,
  removeCardFromColumn,
  updateCardDescription
}) => {
  const { boardId } = useParams<{ boardId: string }>();
  const board = boards.find((b) => b.boardId === parseInt(boardId as string));
  const navigate = useNavigate();

  const handleNavigationBack = () => {
    navigate("/");
  };

  if (!board) {
    return (
      <div>
        <div>Board not found!</div>
        <div
          className="flex flex-row items-center"
          onClick={handleNavigationBack}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-black ml-2 text-base"
          />
          <p className="mb-0 ml-1">back</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex flex-row items-center w-fit m-3"
        onClick={handleNavigationBack}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-black ml-2 text-base"
        />
        <p className="mb-0 ml-1">back</p>
      </div>
      <Board
        boardId={board.boardId}
        boardTitle={board.boardTitle}
        deleteBoard={() => deleteBoard(board.boardId)}
        setTitle={setBoardTitle}
        columns={board.columns}
        addColumn={addColumnToBoard}
        removeColumn={removeColumnFromBoard}
        changeColumnTitle={changeColumnTitle}
        updateCardDescription={updateCardDescription}
        addCardToColumn={addCardToColumn} 
        removeCardFromColumn={removeCardFromColumn} 
      />
    </div>
  );
};

export default BoardPage;
