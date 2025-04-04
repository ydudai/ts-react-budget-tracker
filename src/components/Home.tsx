import React, { useState } from 'react'
import BudgetSummary from './BudgetSummary'
import TranactionList from './TranactionList'
import ExpensesByCategory from './ExpensesByCategory'
import AddTransaction from './AddTransaction'
import { Transaction } from '../types/Transaction'
import { TransactionType } from '../types/TransactionType'

type Props = {}

export default function Home({ }: Props) {

  const defTransaction: Transaction = {
    id: -1,
    transactiontype: TransactionType.income,
    title: '',
    category: '',
    date: '',
    price: -1,
  }

  const [transaction, setTransaction] = useState(defTransaction);
  const [isAddTransactionVisible, setAddTransactionVisible] = useState(false);
  const [tranactionAction, setTranactionAction] = useState('add')

  function addForm() {
    setTranactionAction('add')
    setTransaction(defTransaction)
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

      {isAddTransactionVisible && <AddTransaction transactionAction={tranactionAction} transaction={transaction} setAddTransactionVisible={setAddTransactionVisible}></AddTransaction>}

      <TranactionList setAddTransactionVisible={setAddTransactionVisible} setTransactionAction={setTranactionAction} setTransaction={setTransaction}></TranactionList>
      <ExpensesByCategory></ExpensesByCategory>
    </div>
  )
}