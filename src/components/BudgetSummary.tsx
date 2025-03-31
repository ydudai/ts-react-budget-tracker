import React from 'react'

type Props = {}

export default function BudgetSummary({ }: Props) {

    return (
        <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-green-600 font-bold text-base md:text-lg mb-2">Total Income</h2>
            <p className="text-xl md:text-2xl font-semibold text-green-700">10000$</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-red-600 font-bold text-base md:text-lg mb-2">Total Expense</h2>
            <p className="text-xl md:text-2xl font-semibold text-red-700">5000$</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center">
            <h2 className="text-blue-600 font-bold text-base md:text-lg mb-2">Saving</h2>
            <p className="text-xl md:text-2xl font-semibold text-blue-700">4000$</p>
          </div>
        </div>
      </div>
    )

}