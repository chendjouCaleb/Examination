import {Injectable} from "@angular/core";
import {MsDialog} from "@ms-fluent/components";
import {ImageCropper} from "./image-cropper";
import {Observable} from "rxjs";
import {ImageCropperData} from "./image-cropper-data";
import {ImageCropperInfo} from "./image-cropper-info";

@Injectable({providedIn: 'root'})
export class ImageCropperDialog {
  constructor(private _dialog: MsDialog) {
  }

  open(info: ImageCropperInfo): Observable<ImageCropperData> {
    const dialogRef = this._dialog.open(ImageCropper, {disableClose: true, data: {info}});
    return dialogRef.afterClosed();
  }
}
