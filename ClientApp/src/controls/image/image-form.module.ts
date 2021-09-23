import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageForm} from './image-form';
import {MsButtonModule, MsDialogModule} from '@ms-fluent/components';
import {ImageFormDialog} from './image-form-dialog';

@NgModule({
  imports: [CommonModule, MsButtonModule, MsDialogModule],
  declarations: [ImageForm],
  providers: [ImageFormDialog],
  exports: [ImageForm]
})
export class ImageFormModule {
}
