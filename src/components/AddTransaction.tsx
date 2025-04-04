import React, { useState } from 'react'
import { TransactionType } from '../types/TransactionType';
import { Transaction } from '../types/Transaction';
import { useAppContext } from '../AppContext';
import { getSortedTransactionList, getTotalPriceOfTransactions, getTotalPriceOfTransactionsType } from '../services/getTransactions';


type Props = {
    transactionAction: string,
    transaction: Transaction,
    setAddTransactionVisible: Function
}

export default function AddTransaction({ transactionAction, transaction, setAddTransactionVisible }: Props) {
    const action = transactionAction
    const setAddTransactionComp = setAddTransactionVisible;

    let defType: string = "Income"
    if (transaction.transactiontype == TransactionType.expense) {
        defType = "Expense"
    } else if (transaction.transactiontype == TransactionType.income) {
        defType = "Income"
    }

    let formHeader = "Add Transaction"
    let actionButtonText = "Add"
    if (action === "edit") {
        formHeader = "Edit Transaction"
        actionButtonText = "Update"

    } else if (action === "add") {
        formHeader = "Add Transaction"
        actionButtonText = "Add"
        defType = "Income"
    }

    const defTransaction: Transaction = {
        id: -1,
        transactiontype: TransactionType.income,
        title: '',
        category: '',
        date: '',
        price: -1,
    }

    const { transactionList, setTransactionList } = useAppContext();
    const { setTypeSummary } = useAppContext()
    const { setCategorySummary } = useAppContext();

    const [selectedTransactionType, setSelectedTransactionType] = useState(defType);
    const [category, setCategory] = useState(transaction.category);
    const [title, setTitle] = useState(transaction.title);
    const [date, setDate] = useState(transaction.date);
    const [price, setPrice] = useState(transaction.price);


    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedTransactionType(event.target.value);
    };


    function addUpdate() {
        if (action === "add") {
            add()
        } else if (action === "edit") {
            update()
        }
    }

    function add() {
        let sortedTransList: Transaction[] = getSortedTransactionList()
        let nextid: number = sortedTransList[0].id + 1;
        let tType: TransactionType = TransactionType.income;
        if (selectedTransactionType === "Income") {
            tType = TransactionType.income
        } else if (selectedTransactionType === "Expense") {
            tType = TransactionType.expense
        }

        let newTranasaction: Transaction = {
            id: nextid,
            transactiontype: tType,
            title: title,
            category: category,
            date: date,
            price: price,
        }

        const updatedList = [...transactionList, newTranasaction];
        setTransactionList(updatedList)

        let tSummary: { transactiontype: TransactionType; price: number; }[] = getTotalPriceOfTransactionsType(updatedList);
        setTypeSummary(tSummary)

        let cSummary: { category: string; price: number; }[] = getTotalPriceOfTransactions(updatedList);
        setCategorySummary(cSummary)

        setAddTransactionComp(false);
    }


    function update() {
        let tType = TransactionType.income
        if (selectedTransactionType === "Income") {
            tType = TransactionType.income
        } else if (selectedTransactionType === "Expense") {
            tType = TransactionType.expense
        }

        let updatedTranasaction: Transaction = {
            id: transaction.id,
            transactiontype: tType,
            title: title,
            category: category,
            date: date,
            price: price,
        }

        updateTransactionList(transactionList, setTransactionList, updatedTranasaction)

     }


    const updateTransactionList = (
        transactionList: Transaction[],
        setTransactionList: React.Dispatch<React.SetStateAction<Transaction[]>>,
        updatedTransaction: Transaction) => {

        // Create a new array by mapping through the existing transactionList
        const newTransactionList = transactionList.map(transaction => {
            // If this is the transaction we want to update
            if (transaction.id === updatedTransaction.id) {
                return updatedTransaction;
            } else {
                return transaction;
            }
        });

        // Update the state with the new array
        setTransactionList(newTransactionList);

        let tSummary: { transactiontype: TransactionType; price: number; }[] = getTotalPriceOfTransactionsType(newTransactionList);
        setTypeSummary(tSummary)

        let cSummary: { category: string; price: number; }[] = getTotalPriceOfTransactions(newTransactionList);
        setCategorySummary(cSummary)

        setAddTransactionComp(false);

    };

    return (
        <>
            <div className="p-6">
                <div className="max-w-lg mx-auto">
                    <h3 className="text-2xl font-semibold text-start mb-4">{formHeader}</h3>

                    {/* Type Field */}
                    <label className="block text-start text-sm font-medium mb-2 "
                        htmlFor="type" >Type</label>
                    {/* <select id="type" name="type" value={selType} defaultValue={defType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"> */}
                    <select id="type" name="type" value={selectedTransactionType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Income</option>
                        <option>Expense</option>
                    </select>

                    {/* Category Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="category" >Category</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="text" id="category" name="category" value={category} onChange={e => setCategory(e.target.value)} />
                    </div>

                    {/* Title Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="category" >Title</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>

                    {/* Date Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="date" >Date</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="date" id="date" name="date" value={date} onChange={e => setDate(e.target.value)} />
                    </div>

                    {/* Price Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="price" >Price</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="number" id="price" name="price" value={price} onChange={e => setPrice(parseFloat(e.target.value) || 0)} />
                    </div>

                    {/* Add or Update Transaction Button */}
                    <button type="button" onClick={addUpdate} className="flex -space-x-0  mt-6 w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        {actionButtonText}
                    </button>

                </div>
            </div>
        </>
    )
}


