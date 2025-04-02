import { Transaction } from "../types/Transaction";
import { TransactionType } from "../types/TransactionType";

// Define the type for our grouped result
interface GroupedItems {
    [key: string]: Transaction[];
}


/**
 * 
 * @returns Transaction[]
 */
export default function getTransactionList(): Transaction[] {
    const transactions: Transaction[] = [
        {
            id: 1,
            transactiontype: TransactionType.expense,
            title: 'Fishing',
            category: 'Hobbies',
            date: '2024-01-01',
            price: 800
        },
        {
            id: 2,
            transactiontype: TransactionType.income,
            title: 'salary in IAI',
            category: 'salary',
            date: '2024-01-01',
            price: 20000
        },
        {
            id: 3,
            transactiontype: TransactionType.expense,
            title: 'Monthly Salary',
            category: 'Salary',
            date: '2024-01-02',
            price: 10000
        },
        {
            id: 4,
            transactiontype: TransactionType.expense,
            title: 'New computer',
            category: 'Program',
            date: '2024-01-03',
            price: 6000
        },
        {
            id: 5,
            transactiontype: TransactionType.expense,
            title: 'Movies',
            category: 'Hobbies',
            date: '2024-04-05',
            price: 700
        },
        {
            id: 6,
            transactiontype: TransactionType.income,
            title: 'Apartment rent Holon',
            category: 'Rent',
            date: '2024-01-10',
            price: 6000
        },
        {
            id: 7,
            transactiontype: TransactionType.expense,
            title: 'New computer',
            category: 'Program',
            date: '2024-01-11',
            price: 4000
        },
        {
            id: 8,
            transactiontype: TransactionType.income,
            title: 'Apartment rent Rishon',
            category: 'Rent',
            date: '2024-01-15',
            price: 5400
        },
        {
            id: 9,
            transactiontype: TransactionType.expense,
            title: 'Socker',
            category: 'Hobbies',
            date: '2024-01-31',
            price: 500
        },
    ];
    return transactions;
}
const tList: Transaction[] = getTransactionList();


/**
 *  Group the items by category
 * @param tList 
 * @returns groupedObjects
 */
export function getGroupedTransactions(tList: Transaction[]) {
    const groupedObjects: GroupedItems = tList.reduce((result: GroupedItems, obj: Transaction) => {
        (result[obj.category] = result[obj.category] || []).push(obj);
        return result;
    }, {});

    return groupedObjects
}
// const groupedObjects = getGroupedTransactions(tList)
// console.log(groupedObjects);


export interface CategorySummary {
    [category: string]: {
        category: string;
        price: number;
    };
}

/**
 * Create an array of total price according to category
 * @param tList Transaction[]
 * @returns 
 */
export function getTotalPriceOfTransactions(tList: Transaction[]): { category: string; price: number }[] {

    console.log(tList)
    
    // Get only expenses from array of all transactions
    const newList: Transaction[] = tList.filter(o => o.transactiontype == TransactionType.expense)

    // Step 1: Reduce transactions into category summaries
    const categorySummary: CategorySummary = newList.reduce((acc: CategorySummary, item: Transaction) => {
        // If category exists, add to its price, otherwise create new entry
        acc[item.category] = acc[item.category]
            ? {
                category: item.category,
                price: item.price + acc[item.category].price
            }
            : {
                category: item.category,
                price: item.price
            };

        return acc;
    }, {});

    const result = Object.values(categorySummary);
    return result;
}
// const categorySummary = getTotalPriceOfTransactions(tList)
// console.log(categorySummary);



export interface TransactionsTypeSummary {
    [transactiontype: string]: {
        transactiontype: TransactionType;
        price: number;
    };
}


export function getTotalPriceOfTransactionsType(tList: Transaction[]): { transactiontype: TransactionType; price: number }[] {
    // Step 1: Reduce transactions into category summaries
    const transactionsTypeSummary: TransactionsTypeSummary = tList.reduce((acc: TransactionsTypeSummary, item: Transaction) => {

        acc[item.transactiontype] = acc[item.transactiontype]
            ? {
                transactiontype: item.transactiontype,
                price: item.price + acc[item.transactiontype].price
            }
            : {
                transactiontype: item.transactiontype,
                price: item.price
            };

        return acc;
    }, {});

    const result = Object.values(transactionsTypeSummary);
    return result;
}
// const transactionsTypeSummary = getTotalPriceOfTransactionsType(tList)
// console.log(transactionsTypeSummary);


export function getSortedTransactionList() : Transaction[] {
    const transList: Transaction[] = getTransactionList();

    transList.sort((a, b) => b.id - a.id);
    return transList;
}
let sortedTransList: Transaction[] = getSortedTransactionList()
console.log( sortedTransList[0].id);
