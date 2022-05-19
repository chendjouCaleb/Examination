import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild} from "@angular/core";
import {MS_DIALOG_DATA, MsDialogRef} from "@ms-fluent/components";
import Cropper from 'cropperjs';
import {ImageCropperInfo} from "./image-cropper-info";
import {ImageCropperData} from "./image-cropper-data";

@Component({
  templateUrl: 'image-cropper.html',
})
export class ImageCropper implements OnDestroy, AfterViewInit {
  _cropper: Cropper;

  _resizeMode: boolean;

  @ViewChild('imageElement')
  _imageElement: ElementRef<HTMLImageElement>;

  info: ImageCropperInfo;

  constructor(private _dialogRef: MsDialogRef<ImageCropper>,
              @Inject(MS_DIALOG_DATA) data) {
    this.info = data.info;
  }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.startResize();
    })
  }

  startResize() {
    if (this._cropper) {
      this._cropper.destroy();
    }
    this._resizeMode = true;
    this._imageElement.nativeElement.src = this.info.imageUrl;

    this._cropper = new Cropper(this._imageElement.nativeElement, {aspectRatio: this.info.aspectRadio});

    //this._changeDetector.markForCheck();
  }

  async endResize() {
    const data = await this.getData();
    this._cropper.destroy();
    this._dialogRef.close(data);

  }

  getData(): Promise<ImageCropperData> {
    return new Promise<ImageCropperData>((resolve, reject) => {
      const canvas = this._cropper.getCroppedCanvas({width: this.info.imageSize, height: this.info.imageSize});
      canvas.toBlob((blob) => {

        const data = new ImageCropperData();
        data.blob = blob;
        data.url = canvas.toDataURL();
        resolve(data);
      });
    })
  }

  close() {
    this._dialogRef.close();
  }

  ngOnDestroy() {
    if (this._cropper) {
      this._cropper.destroy();
    }
  }
}
