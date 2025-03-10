import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la interfaz del objeto que deseas compartir
interface HistoryContextType {
  sharedData: any; // Cambia `any` por el tipo de tu objeto si es conocido
  setSharedData: (data: any) => void;
}

// Crear el contexto con valores iniciales
const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

// Proveedor del contexto
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [sharedData, setSharedData] = useState<any>(null);

  return (
    <HistoryContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </HistoryContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext debe usarse dentro de un DataProvider');
  }
  return context;
};
