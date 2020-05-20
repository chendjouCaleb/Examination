import {Component, Input} from "@angular/core";
import {MsfModalRef} from "fabric-docs";

@Component({
  template: `
    <div class="ms-form p-3">
      <div class="ms-fontSize-20 ">  {{message}} </div>
      <div class="mt-3 text-center">
          <button MsfButton theme="standard" (click)="close(false)">Non</button>
          <button MsfButton theme="primary" class="ml-2" (click)="close(true)" >Oui</button>
      </div>
    </div>
  `
})
export class ConfirmationComponent {
  @Input()
  message: string = "";

  constructor(private dialogRef: MsfModalRef<ConfirmationComponent>) {  }

  close(value: boolean) {
    this.dialogRef.close(value);
  }
}
