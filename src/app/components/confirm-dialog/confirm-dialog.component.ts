import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  isLoading: boolean = false;
  @Input() text: string = '';
  @Input() type: string = 'info';
  @Input() action: Function;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.text = data.text;
    this.type = data.type;
    this.action = data.action;
    this.isLoading = false;
  }

  startAction() {
    this.isLoading = true;
    this.action();
  }

  close() {
    this.dialogRef.close();
  }
}
