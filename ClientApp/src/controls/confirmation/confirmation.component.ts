import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  template: `
      <div mat-dialog-content class="ms-fontSize-20 font-weight-light">  {{message}} </div>
      <div mat-dialog-actions>
          <button MsfButton (click)="close(false)">Non</button>
          <button MsfButton theme="primary" class="ml-2" (click)="close(true)" >Oui</button>
      </div>
  `
})
export class ConfirmationComponent {
  message: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<ConfirmationComponent>) {
    this.message = data.message;
  }

  close(value: boolean) {
    this.dialogRef.close(value);
  }
}
