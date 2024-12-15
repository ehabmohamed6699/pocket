import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';
import { IHistory } from '../models/IHistory';
import { IExpense } from '../models/IExpense';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser;
  constructor() {
    this.user = {
      id: 'aaa',
      username: 'Ehab',
      categories: ['Food', 'Transportation'],
      history: [
        {
          date: '2024-12',
          totalIncome: 2000,
          expenses: [
            {
              category: 'Food',
              name: 'Lunch',
              amount: 10
            },
            {
              category: 'Transportation',
              name: 'Transportation',
              amount: 5
            }
          ],
          totalExpenses: 15
        }
      ]
    }
  }

  getUser(): Observable<IUser> {
    return new Observable<IUser>(observer => {
      observer.next(this.user);
      observer.complete();
    })
  }

  getCategories(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      observer.next(this.user.categories);
      observer.complete();
    })
  }

  addCategory(name: string): Observable<string> {
    return new Observable<string>(observer => {
      this.user.categories.push(name)
      observer.next(name)
      observer.complete()
    })
  }

  addExpense(month: string, expense: IExpense): Observable<IExpense>{
    return new Observable<IExpense>(observer => {
      let history = this.user.history.find(h => h.date === month);
      if(!history){
        throw new Error('This month is not in your data!')
      }
      if(history.totalIncome < expense.amount){
        throw new Error('This is more than the money you have!')
      }
      history.expenses.push(expense)
      history.totalExpenses += expense.amount
      history.totalIncome -= expense.amount
      observer.next(expense)
      observer.complete()
    })
  }

  getHistory(month: string): Observable<IHistory>{
    return new Observable<IHistory>(observer => {
      let history = this.user.history.find(h => h.date === month);
      if(!history){
        history = {
          date: month,
          totalIncome: 0,
          expenses: [],
          totalExpenses: 0
        }
        this.user.history.push(history);
      }
      observer.next(history);
      observer.complete();
    })
  }
}
