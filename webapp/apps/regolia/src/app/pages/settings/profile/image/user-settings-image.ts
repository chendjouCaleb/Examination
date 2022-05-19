import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {User} from "examination/entities";
import {IdentityManager} from "examination/app/identity";
import {AlertEmitter, ImageCropper, ImageCropperData, ImageCropperDialog, ImageCropperInfo} from "src/controls";
import {Observable} from "rxjs";

@Component({
  templateUrl: 'user-settings-image.html',
  selector: 'user-settings-image'
})
export class UserSettingsImage {
  @Input()
  user: User;

  @ViewChild('inputFile')
  _inputFile: ElementRef<HTMLInputElement>;

  @ViewChild('imageElement')
  _imageElement: ElementRef<HTMLImageElement>;

  imageData: ImageCropperData;

  constructor(private _identity: IdentityManager,
              private _alert: AlertEmitter,
              private _cropper: ImageCropperDialog) {
  }

  select() {
    this._inputFile.nativeElement.click();
  }


  loadImage(inputImage: HTMLInputElement) {
    if (inputImage.files.length === 0) {
      return;
    }
    const file = inputImage.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async (event) => {
      const info = new ImageCropperInfo();
      info.imageUrl = reader.result.toString();
      const result: Observable<ImageCropperData> = this._cropper.open(info);
      result.subscribe(data => {
        if(data) {
          this._imageElement.nativeElement.src = data.url;
          this.imageData = data;
        }
      })
    });
    reader.readAsDataURL(file);
  }

  async changeImage() {
    if(this.imageData) {
      await this._identity.changeImage(this.user, this.imageData.blob);
      this.user.imageUrl = this.user.imageUrl + '?' + Date.now();
      this._alert.info("Votre photo de profil a été changée.");
    }
  }

  cancel() {
    this.user.imageUrl = this.user.imageUrl + '?' + Date.now();
    this.imageData = null;
  }

}
