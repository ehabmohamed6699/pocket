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
    const userJSON = localStorage.getItem('pocket-user');
      let user: IUser;
      if(!userJSON){
        user = {
          id:'0',
          username: 'Temp',
          categories: [],
          history: []
        }
        localStorage.setItem('pocket-user',JSON.stringify(user))
      }else{
        user = JSON.parse(userJSON)
      }
      this.user = user
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
      this.saveUser()
      observer.next(name)
      observer.complete()
    })
  }

  deleteCategory(name: string): Observable<string>{
    return new Observable<string>(observer => {
      this.user.categories = this.user.categories.filter(x => x !== name);
      this.saveUser()
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
      this.saveUser()
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
      this.saveUser()
      observer.next(history);
      observer.complete();
    })
  }

  changeHistoryIncome(month: string, amount: number): Observable<IHistory>{
    return new Observable<IHistory>(observer => {
      let history = this.user.history.find(h => h.date === month);
      if(!history){
        throw new Error("This month doesn't keep track of your expenses")
      }
      history.totalIncome = amount
      this.saveUser()
      observer.next(history);
      observer.complete();
    })
  }

  private saveUser(){
    localStorage.setItem('pocket-user', JSON.stringify(this.user))
  }
}

