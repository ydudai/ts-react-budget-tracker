import React, { useState } from 'react'
import { useAppContext } from '../AppContext';
import { CategorySummary, getTotalPriceOfTransactions } from '../services/getTransactions'

type Props = {}

export default function ExpensesByCategory({ }: Props) {
    const { tranactionList, setTranactionList } = useAppContext();

    const cSummary: { category: string; price: number; }[] = getTotalPriceOfTransactions(tranactionList)
    const [categorySummary, setCategorySummary] = useState(cSummary);

    return (
        <div className='flex-row justify-items-start'>
            <div className='flex-row justify-items-start' ></div>
            <h2 className='font-bold mt-5'>Expenses By Category</h2>
            <div className="w-full max-w-2xl mx-auto">
                {categorySummary.map((obj, index) => (
                    <div key={index}>
                        <div className="flex justify-between py-2 border-b">
                            <h2 className="text-xl font-bold">{obj.category}</h2>
                            <span className="text-xl">₪{obj.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}