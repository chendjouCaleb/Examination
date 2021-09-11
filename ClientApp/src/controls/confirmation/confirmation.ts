import {Injectable} from '@angular/core';
import {ConfirmationComponent} from './confirmation.component';
import {Subject} from 'rxjs';
import {MsDialog} from '@ms-fluent/components';

@Injectable({providedIn: 'root'})
export class Confirmation {
    constructor(private dialog: MsDialog) {}

    open(message: string): ConfirmationInstance {
      const result = new ConfirmationInstance();
      const dialogRef = this.dialog.open(ConfirmationComponent, {minWidth: '300px'});
      dialogRef.componentInstance.message = message;
      dialogRef.afterClosed().subscribe(r => r ? result.accept.next() : result.reject.next());

      return result;
    }
}

export class ConfirmationInstance {
  accept: Subject<void> = new Subject<void>();
  reject: Subject<void> = new Subject<void>();
}
