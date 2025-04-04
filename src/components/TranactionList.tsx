import TransactionComponent from './TransactionComponent';
import { useAppContext } from '../AppContext'

type Props = {
    setAddTransactionVisible: Function,
    setTransactionAction: Function
    setTransaction: Function
}

export default function TranactionList({ setTransactionAction, setAddTransactionVisible, setTransaction }: Props) {

    const { transactionList } = useAppContext();

    return (
        <div className='flex-row justify-items-start' >
            <h2 className='font-bold mt-5'>Tranactions</h2>
            <div className="w-full max-w-2xl mx-auto">
                {transactionList.map((transaction) => (
                    <div key={transaction.id}>
                        <TransactionComponent setTransactionAction={setTransactionAction} transaction={transaction} setAddTransactionVisible={setAddTransactionVisible} setTransaction={setTransaction}></TransactionComponent>
                    </div>
                ))}
            </div>
        </div>
    )
}