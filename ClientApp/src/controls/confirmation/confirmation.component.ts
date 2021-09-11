import {Component, Input} from '@angular/core';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  template: `
    <div class="ms-form p-3">
      <div class="ms-fontSize-20 text-center">  {{message}} </div>
      <div class="mt-3 text-center">
          <button msButton theme="standard" (click)="close(false)">Non</button>
          <button msButton theme="primary" class="ml-2" (click)="close(true)" >Oui</button>
      </div>
    </div>
  `
})
export class ConfirmationComponent {
  @Input()
  message: string = '';

  constructor(private dialogRef: MsDialogRef<ConfirmationComponent>) {  }

  close(value: boolean) {
    this.dialogRef.close(value);
  }
}
