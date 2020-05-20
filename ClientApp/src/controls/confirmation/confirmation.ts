import {Injectable} from "@angular/core";
import {ConfirmationComponent} from "./confirmation.component";
import {Subject} from "rxjs";
import {MsfModal} from "fabric-docs";

@Injectable()
export class Confirmation {
    constructor(private dialog: MsfModal) {}

    open(message: string): ConfirmationInstance {
      const result= new ConfirmationInstance();
      const dialogRef = this.dialog.open(ConfirmationComponent, {width: '350px'});
      dialogRef.componentInstance.message = message;
      dialogRef.afterClosed().subscribe(r => r ? result.accept.next() : result.reject.next());

      return result;
    }
}

export class ConfirmationInstance {
  accept: Subject<void> = new Subject<void>();
  reject: Subject<void> = new Subject<void>();
}
