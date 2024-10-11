export interface DashboardProps {
  boards: BoardData[];
  addBoard: () => void;
  deleteBoard: (id: number) => void;
  setBoardTitle: (id: number, title: string) => void;
}

export interface BoardPageProps {
  boards: BoardData[];
  deleteBoard: (id: number) => void;
  setBoardTitle: (id: number, title: string) => void;
  addColumnToBoard: (boardId: number) => void;
  removeColumnFromBoard: (boardId: number, columnId: string) => void;
  changeColumnTitle: (
    boardId: number,
    columnId: string,
    newTitle: string
  ) => void;
  addCardToColumn: (boardId: number, columnId: string) => void;
  removeCardFromColumn: (
    boardId: number,
    columnId: string,
    cardId: string
  ) => void;
  updateCardDescription: (
    boardId: number,  
    columnId: string,
    cardId: string,
    newDescription: string
  ) => void;
}

export interface BoardProps {
  boardId: number;
  boardTitle: string | undefined;
  deleteBoard: (boardId: number) => void;
  setTitle: (boardId: number, title: string) => void;
  columns: { [columnId: string]: ColumnData };
  addColumn: (boardId: number) => void;
  removeColumn: (boardId: number, columnId: string) => void;
  changeColumnTitle: (
    boardId: number,
    columnId: string,
    newTitle: string
  ) => void;
  addCardToColumn: (boardId: number, columnId: string) => void;
  removeCardFromColumn: (
    boardId: number,
    columnId: string,
    cardId: string
  ) => void;
  updateCardDescription: (
    boardId: number,
    columnId: string,
    cardId: string,
    newDescription: string
  ) => void;
}

export interface ColumnProps {
  columnId: string;
  columnTitle: string;
  cards: CardData[];
  changeColumnTitle: (newTitle: string) => void;
  removeColumn: () => void;
  onDrop: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
  addCard: () => void;
  removeCard: (cardId: string) => void;
  updateCardDescription: (
    cardId: string,
    newDescription: string
  ) => void;  
}

export interface CardProps { 
  cardId: string; 
  cardTitle?: string;
  cardDescription?: string;
  columnId: string;
  removeCard: (cardId: string) => void;
  updateCardDescription: (cardId: string, newDescription: string) => void; 
}

export interface BoardData {
  boardId: number;
  boardTitle: string;
  columns: { [columnId: string]: ColumnData };
}

export interface ColumnData {
  columnId: string;
  columnTitle: string;
  cards: { [cardId: string]: CardData };
}

export interface CardData {
  cardId: string;
  cardTitle: string;
  cardDescription: string;
}