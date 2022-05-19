import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule} from "@ms-fluent/components";
import {ImageCropper} from "./image-cropper";
import {ImageCropperDialog} from "./image-cropper-dialog";

@NgModule({
  imports: [ CommonModule, MsButtonModule ],
  declarations: [ ImageCropper ],
  exports: [ ImageCropper ],
  providers: [ ImageCropperDialog ]
})
export class ImageCropperModule {}
