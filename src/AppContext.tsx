import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import gettranactions, { getTotalPriceOfTransactions, getTotalPriceOfTransactionsType } from "./services/getTransactions"
import { Transaction } from "./types/Transaction";
import { TransactionType } from "./types/TransactionType";

// Define a type for context value
type AppContextType = {
    transactionList: Transaction[];
    setTransactionList: Dispatch<SetStateAction<Transaction[]>>;
    typeSummary: { transactiontype: TransactionType; price: number; }[];
    setTypeSummary: Dispatch<SetStateAction<{ transactiontype: TransactionType; price: number; }[]>>;
    categorySummary: { category: string; price: number; }[];
    setCategorySummary: Dispatch<SetStateAction<{ category: string; price: number; }[]>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    let tList: Transaction[]  = []
    let tSummary: { transactiontype: TransactionType; price: number; }[] = []
    let cSummary:{ category: string; price: number; }[] = []

    const [transactionList, setTransactionList] = useState(tList)
    const [typeSummary, setTypeSummary] = useState(tSummary);
    const [categorySummary, setCategorySummary] = useState(cSummary);
 
    useEffect(() => {
        tList = gettranactions();
        tSummary = getTotalPriceOfTransactionsType(tList);
        cSummary = getTotalPriceOfTransactions(tList);  
        
        setTransactionList(tList)
        setTypeSummary(tSummary)
        setCategorySummary(cSummary)
    }, [])


    return (
        <AppContext.Provider value={{ transactionList, setTransactionList, typeSummary, setTypeSummary, categorySummary, setCategorySummary }}>
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