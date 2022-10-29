import { Component, OnInit } from "@angular/core";
import { QuerySnapshot } from "@angular/fire/firestore";
import { Category } from "src/app/models/category.model";
import { ApplicationService } from "src/app/services/application.service";
import { CategoryService } from "src/app/services/category.service";
import { ErrorUtils } from "src/app/utils/error.utils";



@Component({
    selector: 'category',
    templateUrl: 'category.component.html',
    styleUrls: ['category.component.css']
})

export class CategoryComponent implements OnInit {

    categories: Category[] = [];

    constructor(private categoryService: CategoryService, private _appService: ApplicationService) {
        this._appService.setBackArrowRoute('');
        this._appService.setNavBar('Categorías');
    }

    ngOnInit(): void {
        this._getAll();
    }

    private _getAll(): void {
        this.categoryService.getAll()
            .then((result: QuerySnapshot<Category>) => this.categories = result.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }))
            .catch(error => ErrorUtils.handleError(error));
    }
}