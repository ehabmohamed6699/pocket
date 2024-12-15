import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IHistory } from '../../models/IHistory';
import { AddExpenseComponent } from "./atoms/AddExpense/AddExpense.component";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { IExpense } from '../../models/IExpense';

@Component({
  selector: 'app-wallet',
  imports: [AddExpenseComponent, CurrencyPipe, MatIconModule, FormsModule, JsonPipe],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit{
  date: number;
  datePipe = new DatePipe('en-US');
  monthYear:string | null;
  history!: IHistory;
  editingIncome: boolean = false;
  currency = new CurrencyPipe('en-US');
  editingIndex: number = -1
  editingExpense: IExpense = {} as IExpense
  constructor(
    private userService: UserService
  ){
    this.date = Date.now();
    this.monthYear = this.datePipe.transform(this.date, 'MMMM yyyy');
  }
  ngOnInit(): void {
    this.userService.getHistory(this.datePipe.transform(this.date, 'yyyy-MM') || '').subscribe(h => {
      this.history = h;
      console.log(this.history);
    })
  }
  setEditingIncome(bool: boolean){
    this.editingIncome = bool
  }

  changeIncome(){
    this.userService.changeHistoryIncome(this.datePipe.transform(this.date, 'yyyy-MM') || '',this.history.totalIncome).subscribe(next => {
      this.setEditingIncome(false)
    })
  }

  openEditExpense(index: number) {
    this.editingIndex = index
    this.editingExpense = {...this.history.expenses[index]}
  }

  editExpense(index: number){
    this.userService.editExpense(this.datePipe.transform(this.date, 'yyyy-MM') || '', this.editingExpense , index).subscribe(() => {
      this.editingIndex = -1
      this.editingExpense ={} as IExpense
    })
  }

  deleteExpense(index:number){
    this.userService.deleteExpense(this.datePipe.transform(this.date, 'yyyy-MM') || '', index).subscribe()
  }

}
