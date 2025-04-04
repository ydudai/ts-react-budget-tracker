import TransactionComponent from './TransactionComponent';
import { useAppContext } from '../AppContext'

type Props = {
    setAddTransactionVisible: Function,
    setTranactionAction: Function
    setTransaction: Function
}

export default function TranactionList({ setTranactionAction, setAddTransactionVisible, setTransaction }: Props) {

     const { tranactionList } = useAppContext();

    return (
        <div className='flex-row justify-items-start' >
            <h2 className='font-bold mt-5'>Tranactions</h2>
            <div className="w-full max-w-2xl mx-auto">
                {tranactionList.map((transaction) => (
                    <div key={transaction.id}>
                        <TransactionComponent setTranactionAction={setTranactionAction} transaction={transaction} setAddTransactionVisible={setAddTransactionVisible} setTransaction={setTransaction}></TransactionComponent>
                    </div>
                ))}
            </div>
        </div>
    )
}