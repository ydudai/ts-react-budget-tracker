import TransactionComponent from './TransactionComponent';
import { useAppContext } from '../AppContext'

type Props = {}

export default function TranactionList({ }: Props) {

    const { tranactionList } = useAppContext();

    return (
        <div className='flex-row justify-items-start' >
            <h2 className='font-bold mt-5'>Tranactions</h2>
            <div className="w-full max-w-2xl mx-auto">
                {tranactionList.map((transaction) => (
                    <div key={transaction.id}>
                        <TransactionComponent transaction={transaction} ></TransactionComponent>
                    </div>
                ))}
            </div>
        </div>
    )
}