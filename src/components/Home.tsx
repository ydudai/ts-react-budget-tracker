import React from 'react'
import BudgetSummary from './BudgetSummary'
import TranactionList from './TranactionList'
import ExpensesByCategory from './ExpensesByCategory'

type Props = {}

export default function Home({}: Props) {
  return (
    <div>
        <h1>Budget Tracker</h1>
        <BudgetSummary></BudgetSummary>
        <TranactionList></TranactionList>
        <ExpensesByCategory></ExpensesByCategory>
    </div>
  )
}