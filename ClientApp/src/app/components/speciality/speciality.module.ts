import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, ImageFormModule, MsfSelectModule, UserPickerModule} from 'examination/controls';
import {MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {SpecialityAdd} from './add/speciality-add';
import {SpecialityEdit} from './edit/speciality-edit';
import {SpecialityService} from './speciality.service';
import {SPECIALITY_SERVICE_TOKEN} from './speciality.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpecialityResolver} from './speciality.resolver';
import {SpecialityDelete} from './delete/speciality-delete';
import {MsButtonModule} from '@ms-fluent/button';
import {SpecialityLevelAdd} from './level/speciality-level-add';

@NgModule({
  imports: [CommonModule, ControlModule, MsfModalModule, MsButtonModule, MsfMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, ImageFormModule, UserPickerModule, MsfSelectModule],
  declarations: [SpecialityAdd, SpecialityEdit, SpecialityDelete, SpecialityLevelAdd],
  exports: [SpecialityAdd, SpecialityEdit, SpecialityDelete, SpecialityLevelAdd],
  providers: [SpecialityResolver, SpecialityService, {
    provide: SPECIALITY_SERVICE_TOKEN,
    useExisting: SpecialityService
  }]
})
export class SpecialityModule {

}
