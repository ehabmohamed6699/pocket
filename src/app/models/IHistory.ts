import { IExpense } from "./IExpense";

export interface IHistory {
    
    date: string;
    totalIncome: number;
    expenses: IExpense[];
    totalExpenses: number;
    
}
