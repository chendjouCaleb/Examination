import { Injectable } from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "./confirmation.component";
import {Subject} from "rxjs";

@Injectable()
export class Confirmation {
    constructor(private dialog: MatDialog) {}

    open(message: string): ConfirmationInstance {
      const result= new ConfirmationInstance();
      const dialogRef = this.dialog.open(ConfirmationComponent, {data : { message }});
      dialogRef.afterClosed().subscribe(r => r ? result.accept.next() : result.reject.next());

      return result;
    }
}

export class ConfirmationInstance {
  accept: Subject<void> = new Subject<void>();
  reject: Subject<void> = new Subject<void>();
}
