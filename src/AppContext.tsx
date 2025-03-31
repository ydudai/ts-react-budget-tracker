import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import gettranactions from "./services/getTransactions"
import { Transaction } from "./types/Transaction";

const tList: Transaction[] = gettranactions();



// Define a type for context value
type AppContextType = {
    tranactionList: Transaction[];
    setTranactionList: Dispatch<SetStateAction<Transaction[]>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const [tranactionList, setTranactionList] = useState(tList)
 
    return (
        <AppContext.Provider value={{ tranactionList, setTranactionList }}>
            {children}
        </AppContext.Provider>
    )
}


// Create a custom hook to use this context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  }