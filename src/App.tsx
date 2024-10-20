import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { BoardData, CardData, ColumnData } from "./types/types.model";
import BoardPage from "./components/boardPage/BoardPage";
import Dashboard from "./components/dashboard/Dashboard";
import { DragDropProvider } from "./context/DragDropContext"; 
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [boards, setBoards] = useLocalStorage<BoardData[]>("boards", []); 

  const newBoard = (): BoardData => {
    const boardId = boards.length + 1;
    return { boardId, boardTitle: "Set board title", columns: {} };
  };

  const addBoard = () => {
    setBoards((prevBoards) => [...prevBoards, newBoard()]);
  };

  const deleteBoard = (id: number): void => {
    setBoards(boards.filter((board) => board.boardId !== id));
  };

  const setBoardTitle = (id: number, title: string) => {
    setBoards(
      boards.map((board) =>
        board.boardId === id ? { ...board, boardTitle: title } : board
      )
    );
  };

  const newColumn = (id: string): ColumnData => ({
    columnId: id,
    columnTitle: "New Column",
    cards: {},
  });

  const changeColumnTitle = (
    boardId: number,
    columnId: string,
    newTitle: string
  ) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.boardId === boardId
          ? {
              ...board,
              columns: {
                ...board.columns,
                [columnId]: {
                  ...board.columns[columnId],
                  columnTitle: newTitle,
                },
              },
            }
          : board
      )
    );
  };

  const addColumnToBoard = (boardId: number) => {
    const newColumnId = crypto.randomUUID();
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.boardId === boardId
          ? {
              ...board,
              columns: {
                ...board.columns,
                [newColumnId]: newColumn(newColumnId),
              },
            }
          : board
      )
    );
  };

  const removeColumnFromBoard = (boardId: number, columnId: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.boardId === boardId
          ? {
              ...board,
              columns: Object.fromEntries(
                Object.entries(board.columns).filter(
                  ([key]) => key !== columnId
                )
              ),
            }
          : board
      )
    );
  };

  const newCard = (cardId: string): CardData => ({
    cardId: cardId, 
    cardTitle: "New Card",
    cardDescription: "",
  });

  const addCardToColumn = (boardId: number, columnId: string) => {
    const newCardId = crypto.randomUUID();
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.boardId === boardId
          ? {
              ...board,
              columns: {
                ...board.columns,
                [columnId]: {
                  ...board.columns[columnId],
                  cards: {
                    ...board.columns[columnId].cards,
                    [newCardId]: newCard(newCardId),
                  },
                },
              },
            }
          : board
      )
    );
    console.log("Added new card to column:", columnId, "Card:", newCard(newCardId));
  };

  const removeCardFromColumn = (
    boardId: number,
    columnId: string,
    cardId: string
  ) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.boardId === boardId
          ? {
              ...board,
              columns: {
                ...board.columns,
                [columnId]: {
                  ...board.columns[columnId],
                  cards: Object.fromEntries(
                    Object.entries(board.columns[columnId].cards).filter(
                      ([id]) => id !== cardId
                    )
                  ),
                },
              },
            }
          : board
      )
    );
  };

  const updateCardDescription = (
    boardId: number,
    columnId: string,
    cardId: string,
    newDescription: string
  ) => {
    setBoards(prevBoards => {
      const updatedBoards = prevBoards.map(board => {
        if (board.boardId !== boardId) return board;
    
        const updatedColumn = {
          ...board.columns[columnId],
          cards: {
            ...board.columns[columnId].cards,
            [cardId]: {
              ...board.columns[columnId].cards[cardId],
              cardDescription: newDescription,
            },
          },
        };
    
        return {
          ...board,
          columns: {
            ...board.columns,
            [columnId]: updatedColumn,
          },
        };
      });
    
      console.log("Updated Boards State: ", updatedBoards); 
      return updatedBoards;
    });
  };

  const moveCard = (cardId: string, targetColumnId: string, sourceColumnId: string) => {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        const sourceColumn = board.columns[sourceColumnId];
        const targetColumn = board.columns[targetColumnId];
  

        console.log("Moving card with ID:", cardId, "From source column:", sourceColumnId, "To target column:", targetColumnId);
  

        const cardToMove = sourceColumn.cards[cardId];
        if (!cardToMove) {
          console.error("Card not found in source column:", sourceColumnId);
          return board;
        }
  

        const updatedSourceColumn = {
          ...sourceColumn,
          cards: Object.fromEntries(
            Object.entries(sourceColumn.cards).filter(([id]) => id !== cardId)
          ),
        };
  

        const updatedTargetColumn = {
          ...targetColumn,
          cards: {
            ...targetColumn.cards,
            [cardId]: cardToMove, 
          },
        };
  

        return {
          ...board,
          columns: {
            ...board.columns,
            [sourceColumnId]: updatedSourceColumn, 
            [targetColumnId]: updatedTargetColumn, 
          },
        };
      });
    });
  };

  const setCardTitle = (
    boardId: number,
    columnId: string,
    cardId: string,
    title: string
  ) => {
    setBoards(prevBoards => {
      const updatedBoards = prevBoards.map(board => {
        if (board.boardId !== boardId) return board;
    
        const updatedColumn = {
          ...board.columns[columnId],
          cards: {
            ...board.columns[columnId].cards,
            [cardId]: {
              ...board.columns[columnId].cards[cardId],
              cardTitle: title,
            },
          },
        };
    
        return {
          ...board,
          columns: {
            ...board.columns,
            [columnId]: updatedColumn,
          },
        };
      });
    
      console.log("Updated Boards State: ", updatedBoards); 
      return updatedBoards;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <DragDropProvider value={{ moveCard }}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  boards={boards}
                  addBoard={addBoard}
                  setBoardTitle={setBoardTitle}
                  deleteBoard={deleteBoard}
                />
              }
            />
            <Route
              path="/board/:boardId"
              element={
                <BoardPage
                  boards={boards}
                  deleteBoard={deleteBoard}
                  setBoardTitle={setBoardTitle}
                  addColumnToBoard={addColumnToBoard}
                  removeColumnFromBoard={removeColumnFromBoard}
                  changeColumnTitle={changeColumnTitle}
                  updateCardDescription={updateCardDescription}
                  addCardToColumn={addCardToColumn}
                  removeCardFromColumn={removeCardFromColumn}
                  setCardTitle={setCardTitle}
                />
              }
            />
          </Routes>
        </DragDropProvider>
      </Router>
    </DndProvider>
  );
}

export default App;
