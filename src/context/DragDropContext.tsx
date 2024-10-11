import React, { createContext, useContext } from 'react';

interface DragDropContextType {
  moveCard: (cardId: string, sourceColumnId: string, targetColumnId: string) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export const useDragDropContext = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDropContext must be used within a DragDropProvider");
  }
  return context;
};

export const DragDropProvider: React.FC<{ children: React.ReactNode, value: DragDropContextType }> = ({ children, value }) => {
  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};