import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IHistory } from '../../models/IHistory';
import { AddExpenseComponent } from "./atoms/AddExpense/AddExpense.component";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  imports: [AddExpenseComponent, CurrencyPipe, MatIconModule, FormsModule],
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

}
