import { Component, OnDestroy, OnInit } from "@angular/core";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "@angular/fire/firestore";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { Account } from "src/app/models/account.model";
import { Category } from "src/app/models/category.model";
import { AccountService } from "src/app/services/account.service";
import { ApplicationService } from "src/app/services/application.service";
import { CategoryService } from "src/app/services/category.service";
import { ExpenseService } from "src/app/services/expense.service";
import { DateUtils } from "src/app/utils/date.utils";
import { ErrorUtils } from "src/app/utils/error.utils";



@Component({
    selector: 'expense-form',
    templateUrl: 'expense-form.component.html',
    styleUrls: ['expense-form.component.css']
})

export class ExpenseFormComponent implements OnInit {

    id: string = '';
    isEditing: boolean = false;
    isLoading: boolean = true;
    form: FormGroup;
    dialogDeleteRef: any;
    categories: Category[] = [];
    accounts: Account[] = [];

    constructor(private _categoryService: CategoryService, private _accountService: AccountService, private _expenseService: ExpenseService, private router: Router, private _appService: ApplicationService, private _activatedRoute: ActivatedRoute, public dialog: MatDialog) {
        this.form = new FormGroup({
            date: new FormControl(DateUtils.dateToString(), Validators.required),
            value: new FormControl(0, Validators.required),
            category: new FormControl(null, Validators.required),
            description: new FormControl(null),
            account: new FormControl(null, Validators.required),
            recurring: new FormControl(null),
            repetitive: new FormControl(null),
            repetitions: new FormControl(null),
        });

        this.id = this._activatedRoute.snapshot.paramMap.get('id') || '';
        this.isEditing = this.id !== '';

        this._appService.setBackArrowRoute('home');
        this._appService.setNavBar(this.isEditing ? 'Editar gasto' : 'Nuevo gasto');
    }

    ngOnInit(): void {
        this._readCategories();
    }

    _readCategories() {
        this._categoryService.getAll()
            .then((result: QuerySnapshot<Category>) => {
                const categories = result.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                });
                this.categories = categories.filter(item => item.type === 1);
                this._readAccounts();
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    _readAccounts() {
        this._accountService.getAll()
            .then((result: QuerySnapshot<Account>) => {
                this.accounts = result.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                });
                if (this.isEditing) {
                    this._loadData();
                } else {
                    this.isLoading = false;
                }
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    private _loadData() {
        this._categoryService.get(this.id)
            .then((result: DocumentSnapshot<DocumentData>) => {
                this.form.patchValue(result.data() || []);
                this.isLoading = false;
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    public save(): void {
        this.isLoading = true;

        if (this.isEditing) {
            this._expenseService.update({ id: this.id, ...this.form.value })
                .then(() => {
                    this._appService.showToast('Gasto modificado');
                    this.router.navigate(['/home']);
                })
                .catch(error => ErrorUtils.handleError(error));
        } else {
            this._expenseService.create(this.form.value)
                .then(() => {
                    this._appService.showToast('Gasto registrado');
                    this.router.navigate(['/home']);
                })
                .catch(error => ErrorUtils.handleError(error));
        }
    }

    onConfirmDelete(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            text: '¿Confirma que desea eliminar el gasto?',
            type: 'delete',
            action: this.onDelete.bind(this, this.id),
        }
        this.dialogDeleteRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    }

    onDelete(id: string): void {
        this.isLoading = true;
        this._categoryService.delete(id)
            .then(() => {
                this.dialogDeleteRef.close();
                this._appService.showToast('Gasto borrado');
                this.router.navigate(['/home'])
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    onUpdatedRecurring() {
        if (this.form.controls['recurring'].value) {
            this.form.controls['repetitive'].setValue(false);
        }
    }

    onUpdatedRepetitive() {
        if (this.form.controls['repetitive'].value) {
            this.form.controls['recurring'].setValue(false);
        }
    }
}