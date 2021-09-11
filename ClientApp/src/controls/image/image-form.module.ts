import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageForm} from './image-form';
import {MsButtonModule} from '@ms-fluent/components';

@NgModule({
  imports: [ CommonModule, MsButtonModule ],
  declarations: [ ImageForm ],
  exports: [ ImageForm ]
})
export class ImageFormModule {}
