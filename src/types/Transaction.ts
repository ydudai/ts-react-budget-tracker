import { TransactionType } from "./TransactionType";

// export  type Transaction = {
//     id: number;
//     title: string;
//     category: string;
//     date: string;
//     price: number;
// }

export  type Transaction = {
    id: number;
    transactiontype: TransactionType
    title: string;
    category: string;
    date: string;
    price: number;
}
