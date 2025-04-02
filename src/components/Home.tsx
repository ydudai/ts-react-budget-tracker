import React, { useState } from 'react'
import BudgetSummary from './BudgetSummary'
import TranactionList from './TranactionList'
import ExpensesByCategory from './ExpensesByCategory'
import AddTransaction from './AddTransaction'

type Props = {}

export default function Home({ }: Props) {

  const [isAddTransactionVisible, setAddTransactionVisible] = useState(false);

  function addForm() {
    setAddTransactionVisible(true);
  }

  return (
    <div>
      <h1>Budget Tracker</h1>
      <BudgetSummary></BudgetSummary>

      {/* Add Transaction Button */}
      <button type="button" onClick={addForm} className="flex space-x-0 mt-6 w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Add Transaction
      </button>

      {isAddTransactionVisible && <AddTransaction setAddTransactionVisible={setAddTransactionVisible}></AddTransaction>}

      <TranactionList></TranactionList>
      <ExpensesByCategory></ExpensesByCategory>
    </div>
  )
}