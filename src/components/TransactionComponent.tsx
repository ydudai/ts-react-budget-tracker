import { useState } from 'react'
import { Transaction } from '../types/Transaction'
import { TransactionType } from '../types/TransactionType'
import AddTransaction from './AddTransaction'
import { useAppContext } from '../AppContext'
import { getTotalPriceOfTransactions, getTotalPriceOfTransactionsType } from '../services/getTransactions'

type Props = {
    setTransactionAction: Function
    transaction: Transaction,
    setAddTransactionVisible: Function,
    setTransaction: Function
}


export default function TransactionComponent({ setTransactionAction, transaction, setAddTransactionVisible, setTransaction }: Props) {

    const setAddTransactionComp = setAddTransactionVisible;

    const { transactionList, setTransactionList, setTypeSummary, setCategorySummary} = useAppContext();
   
    function update() {
        setTransaction(transaction)
        setTransactionAction("edit")
        setAddTransactionComp(true);
    }

    function deleteTransaction() {

        const index = transactionList.findIndex(t => t.id === transaction.id);

        if (index == -1) {
            alert("Transaction " + transaction.title + " is not found")
            return
        }

        const newArray = [
            ...transactionList.slice(0, index), // Elements before the one to delete
            ...transactionList.slice(index + 1) // Elements after the one to delete
        ];
        setTransactionList(newArray);

        let tSummary: { transactiontype: TransactionType; price: number; }[] = getTotalPriceOfTransactionsType(newArray);
        setTypeSummary(tSummary)

        let cSummary: { category: string; price: number; }[] = getTotalPriceOfTransactions(newArray);
        setCategorySummary(cSummary)

    }

    return (
        <div
            // key={transaction.id}
            className={`flex justify-between items-center p-4 mb-2 rounded-lg ${transaction.price > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div>
                <h3 className="font-bold text-lg">{transaction.title}</h3>
                <p className="text-gray-500 text-sm">
                    {transaction.category} - {transaction.date}
                </p>
            </div>
            <div className="flex items-center">
                <span className="mr-4 font-semibold text-lg">
                    ₪{transaction.price}
                </span>
                <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors" onClick={update}>
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors" onClick={deleteTransaction}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

