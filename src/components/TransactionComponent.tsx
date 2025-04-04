import { useState } from 'react'
import { Transaction } from '../types/Transaction'
import { TransactionType } from '../types/TransactionType'
import AddTransaction from './AddTransaction'

type Props = {
    setTranactionAction: Function
    transaction: Transaction,
    setAddTransactionVisible: Function,
    setTransaction: Function
}


    setTransaction: Function
export default function TransactionComponent({ setTranactionAction, transaction, setAddTransactionVisible, setTransaction }: Props) {
   
    const setTranactionActiontion = setTranactionAction
    const setAddTransactionComp = setAddTransactionVisible;
        
    function update() {
        const thisTransaction = transaction
        console.log(thisTransaction)
        setTransaction(transaction)
        setTranactionActiontion("edit")
        setAddTransactionComp(true);
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
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

