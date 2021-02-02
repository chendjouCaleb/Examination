import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule} from "fabric-docs";
import {ImageForm} from "./image-form";

@NgModule({
  imports: [ CommonModule, MsfButtonModule ],
  declarations: [ ImageForm ],
  exports: [ ImageForm ]
})
export class ImageFormModule {}
