import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfPersonaModule} from 'fabric-docs';
import {OverlayModule} from '@angular/cdk/overlay';
import {UserPicker} from 'examination/app/user-picker/user-picker';

@NgModule({
  imports: [ CommonModule, MsfPersonaModule, OverlayModule ],
  declarations: [ UserPicker ],
  exports: [ UserPicker ]
})
export class UserPickerModule {

}
