import { Component, OnDestroy, OnInit } from "@angular/core";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "@angular/fire/firestore";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { ApplicationService } from "src/app/services/application.service";
import { CategoryService } from "src/app/services/category.service";
import { ErrorUtils } from "src/app/utils/error.utils";



@Component({
    selector: 'category-form',
    templateUrl: 'category-form.component.html',
    styleUrls: ['category-form.component.css']
})

export class CategoryFormComponent implements OnInit {

    id: string = '';
    isEditing: boolean = false;
    isLoading: boolean = true;
    form: FormGroup;
    dialogDeleteRef: any;
    categoryTypes: { id: number, name: string }[] = [
        { id: 1, name: 'Gastos' },
        { id: 2, name: 'Ingresos' },
    ];

    constructor(private categoryService: CategoryService, private router: Router, private _appService: ApplicationService, private _activatedRoute: ActivatedRoute, public dialog: MatDialog) {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            color: new FormControl('#000000', Validators.required),
            type: new FormControl(null, Validators.required)
        });

        this.id = this._activatedRoute.snapshot.paramMap.get('id') || '';
        this.isEditing = this.id !== '';

        this._appService.setBackArrowRoute('/category');
        this._appService.setNavBar(this.isEditing ? 'Editar categoría' : 'Crear categoría');
    }

    ngOnInit(): void {
        if (this.isEditing) {
            this._loadData();
        } else {
            this.isLoading = false;
        }
    }

    private _loadData() {
        this.categoryService.get(this.id)
            .then((result: DocumentSnapshot<DocumentData>) => {
                this.form.patchValue(result.data() || []);
                this.isLoading = false;
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    public save(): void {
        this.isLoading = true;

        if (this.isEditing) {
            this.categoryService.update({ id: this.id, ...this.form.value })
                .then(() => this.router.navigate(['/category']))
                .catch(error => ErrorUtils.handleError(error));
        } else {
            this.categoryService.create(this.form.value)
                .then(() => this.router.navigate(['/category']))
                .catch(error => ErrorUtils.handleError(error));
        }
    }

    onConfirmDelete(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            text: '¿Confirma que desea eliminar la categoría?',
            type: 'delete',
            action: this.onDelete.bind(this, this.id),
        }
        this.dialogDeleteRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    }

    onDelete(id: string): void {
        this.isLoading = true;
        this.categoryService.delete(id)
            .then(() => {
                this.dialogDeleteRef.close();
                this._appService.showToast('Categoría borrada');
                this.router.navigate(['/category'])
            })
            .catch(error => ErrorUtils.handleError(error));
    }
}