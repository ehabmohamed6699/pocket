import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IExpense } from '../../../../models/IExpense';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-AddExpense',
  templateUrl: './AddExpense.component.html',
  styleUrls: ['./AddExpense.component.css'],
  imports: [FormsModule, MatIconModule]
})
export class AddExpenseComponent implements OnInit {
  expense: IExpense = {} as IExpense;
  categories: string[] = [];
  addCategoryOpen: boolean = false;
  @Input() month: string = '';
  @ViewChild('categorySelect') categorySelect !:ElementRef;
  catName: string = "";
  error: string = "";
  constructor(
    private userService: UserService,
    public renderer : Renderer2
  ) {

  }

  ngOnInit() {
    this.userService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }

  newExpenseValid():boolean{
    return !!(this.expense.amount) && !!(this.expense.category) && !!(this.expense.name) 
  }

  addExpense(expense: IExpense): void{
    let options = {
      next: () => {
        this.expense = {} as IExpense
        this.error = ''
      },
      error: (err: Error) => {
        this.error = err.message
      }
    }
    this.userService.addExpense(this.month, expense).subscribe(options)
  }

  changeCategory(category: string){
    this.expense.category = category
  }

  deleteCategory(category: string){
    this.userService.deleteCategory(category).subscribe(cat => {
      this.categories = this.categories.filter(x => x !== cat)
      if(this.expense.category === cat){
        this.changeCategory('')
      }
    })
  }

  openAddCategory(){
    this.addCategoryOpen = true
  }

  addCategory(){
    this.userService.addCategory(this.catName).subscribe(cat => {
      this.changeCategory(this.catName)
      this.catName = ""
    })
  }

}
