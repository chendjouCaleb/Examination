import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {UserPicker} from './user-picker';
import {MsPersonaModule} from '@ms-fluent/components';

@NgModule({
  imports: [ CommonModule, MsPersonaModule, OverlayModule ],
  declarations: [ UserPicker ],
  exports: [ UserPicker ]
})
export class UserPickerModule {

}
