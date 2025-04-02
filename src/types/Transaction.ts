import { TransactionType } from "./TransactionType";

export  type Transaction = {
    id: number;
    transactiontype: TransactionType
    title: string;
    category: string;
    date: string;
    price: number;
}
