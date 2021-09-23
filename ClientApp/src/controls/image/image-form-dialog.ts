import {MsDialog} from '@ms-fluent/components';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ImageFormValue} from './ImageFormValue';
import {ImageForm} from './image-form';

@Injectable()
export class ImageFormDialog {
  constructor(private dialog: MsDialog) {}

  open(): Observable<ImageFormValue> {
    const dialogRef = this.dialog.open(ImageForm);

    return dialogRef.afterClosed();
  }
}
