import React, { useState } from 'react'
import { TransactionType } from '../types/TransactionType';
import { Transaction } from '../types/Transaction';
import { useAppContext } from '../AppContext';
import { getSortedTransactionList, getTotalPriceOfTransactions, getTotalPriceOfTransactionsType } from '../services/getTransactions';

type Props = { setAddTransactionVisible: Function }

export default function AddTransaction({ setAddTransactionVisible }: Props) {

    const setAddTransactionComp = setAddTransactionVisible;

    const defTransaction: Transaction = {
        id: -1,
        transactiontype: TransactionType.income,
        title: '',
        category: '',
        date: '',
        price: -1,
    }

    const defType: string = "Income"
    const { tranactionList, setTranactionList } = useAppContext();
    const { setTypeSummary } = useAppContext()
    const { setCategorySummary } = useAppContext();

    const [selectedTransactionType, setSelectedTransactionType] = useState(defType);
    const [category, setCategory] = useState(defTransaction.category);
    const [title, setTitle] = useState(defTransaction.title);
    const [date, setDate] = useState(defTransaction.date);
    const [price, setPrice] = useState(defTransaction.price);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedTransactionType(event.target.value);
    };

    function add() {
        let sortedTransList: Transaction[] = getSortedTransactionList()
        let nextid: number = sortedTransList[0].id + 1;
        let tType: TransactionType = TransactionType.income;
        if (selectedTransactionType != defType) {
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

        const updatedList = [...tranactionList, newTranasaction];
        setTranactionList(updatedList)

        let tSummary: { transactiontype: TransactionType; price: number; }[] = getTotalPriceOfTransactionsType(updatedList);  
        setTypeSummary(tSummary)

        let cSummary: { category: string; price: number; }[] = getTotalPriceOfTransactions(updatedList);       
        setCategorySummary(cSummary)

        setAddTransactionComp(false);
    }

    return (
        <>
            <div className="p-6">
                <div className="max-w-lg mx-auto">
                    <h3 className="text-2xl font-semibold text-start mb-4">Add Transaction</h3>

                    {/* Type Field */}
                    <label className="block text-start text-sm font-medium mb-2 "
                        htmlFor="type" >Type</label>
                    <select id="type" name="type" defaultValue={defType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Income</option>
                        <option>Expense</option>
                    </select>

                    {/* Category Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="category" >Category</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="text" id="category" name="category" onChange={e => setCategory(e.target.value)} />
                    </div>

                    {/* Title Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="category" >Title</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="text" id="title" name="title" onChange={e => setTitle(e.target.value)} />
                    </div>

                    {/* Date Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="date" >Date</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="date" id="date" name="date" onChange={e => setDate(e.target.value)} />
                    </div>

                    {/* Price Field */}
                    <div>
                        <label className="block text-start text-sm font-medium mb-2 mt-4" htmlFor="price" >Price</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="number" id="price" name="price" onChange={e => setPrice(parseFloat(e.target.value) || 0)} />
                    </div>

                    {/* Add Transaction Button */}
                    <button type="button" onClick={add} className="flex -space-x-0  mt-6 w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Add
                    </button>

                </div>
            </div>
        </>
    )
}
