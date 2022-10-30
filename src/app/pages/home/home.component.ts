import { Component, OnInit } from "@angular/core";
import { QuerySnapshot } from "@angular/fire/firestore";
import { Category } from "src/app/models/category.model";
import { Expense } from "src/app/models/expense.model";
import { ApplicationService } from "src/app/services/application.service";
import { CategoryService } from "src/app/services/category.service";
import { ExpenseService } from "src/app/services/expense.service";
import { IncomingService } from "src/app/services/incoming.service";
import { ErrorUtils } from "src/app/utils/error.utils";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    buttonsDisplayed: boolean = false;
    items: any[] = [];
    categories: any = {};

    constructor(private _appService: ApplicationService, private _expenseService: ExpenseService, private _incomingService: IncomingService, private _categoryService: CategoryService) {
        this._appService.setBackArrowRoute('');
        _appService.setNavBar('Inicio');
    }

    ngOnInit(): void {
        this._readCategories();
    }

    private _readCategories(): void {
        this._categoryService.getAll()
            .then((result: QuerySnapshot<Category>) => {
                result.docs.forEach((item) => {
                    this.categories[item.id] = item.data();
                });
                this._readExpenses();
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    private _readExpenses(): void {
        this._expenseService.getAll()
            .then((result: QuerySnapshot<Expense>) => {
                this.items = result.docs.map((item) => {
                    return { ...item.data(), id: item.id, type: 1 }
                });
                this._readIncomings();
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    private _readIncomings(): void {
        this._incomingService.getAll()
            .then((result: QuerySnapshot<Expense>) => {
                const incomings = result.docs.map((item) => {
                    return { ...item.data(), id: item.id, type: 2 }
                });
                this.items = this.items.concat(incomings);
            })
            .catch(error => ErrorUtils.handleError(error));
    }
}