import { Component, OnDestroy, OnInit } from "@angular/core";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "@angular/fire/firestore";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmDialogComponent } from "src/app/components/confirm-dialog/confirm-dialog.component";
import { Account } from "src/app/models/account.model";
import { AccountService } from "src/app/services/account.service";
import { ApplicationService } from "src/app/services/application.service";
import { ErrorUtils } from "src/app/utils/error.utils";



@Component({
    selector: 'account-form',
    templateUrl: 'account-form.component.html',
    styleUrls: ['account-form.component.css']
})

export class AccountFormComponent implements OnInit {

    id: string = '';
    isEditing: boolean = false;
    isLoading: boolean = true;
    form: FormGroup;
    dialogDeleteRef: any;

    constructor(private accountService: AccountService, private router: Router, private _appService: ApplicationService, private _activatedRoute: ActivatedRoute, public dialog: MatDialog) {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            color: new FormControl(null, Validators.required)
        });

        this.id = this._activatedRoute.snapshot.paramMap.get('id') || '';
        this.isEditing = this.id !== '';

        this._appService.setBackArrowRoute('/account');
        this._appService.setNavBar(this.isEditing ? 'Editar cuenta' : 'Crear cuenta');
    }

    ngOnInit(): void {
        if (this.isEditing) {
            this._loadData();
        } else {
            this.isLoading = false;
        }
    }

    private _loadData() {
        this.accountService.get(this.id)
            .then((result: DocumentSnapshot<DocumentData>) => {
                this.form.patchValue(result.data() || []);
                this.isLoading = false;
            })
            .catch(error => ErrorUtils.handleError(error));
    }

    public save(): void {
        this.isLoading = true;

        if (this.isEditing) {
            this.accountService.update({ id: this.id, ...this.form.value })
                .then(() => {
                    this.router.navigate(['/account'])
                })
                .catch(error => ErrorUtils.handleError(error));
        } else {
            this.accountService.create(this.form.value)
                .then(() => this.router.navigate(['/account']))
                .catch(error => ErrorUtils.handleError(error));
        }
    }

    onConfirmDelete(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            text: '¿Confirma que desea eliminar la cuenta?',
            type: 'delete',
            action: this.onDelete.bind(this, this.id),
        }
        this.dialogDeleteRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    }

    onDelete(id: string): void {
        this.isLoading = true;
        this.accountService.delete(id)
            .then(() => {
                this.dialogDeleteRef.close();
                this._appService.showToast('Cuenta borrada');
                this.router.navigate(['/account'])
            })
            .catch(error => ErrorUtils.handleError(error));
    }
}