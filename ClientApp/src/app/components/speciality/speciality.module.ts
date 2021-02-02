import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, ImageFormModule, MsfSelectModule, UserPickerModule} from 'examination/controls';
import {MsfButtonModule, MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {SpecialityAdd} from './add/speciality-add';
import {SpecialityEdit} from './edit/speciality-edit';
import {SpecialityService} from './speciality.service';
import {SPECIALITY_SERVICE_TOKEN} from './speciality.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpecialityResolver} from './speciality.resolver';
import {SpecialityDelete} from './delete/speciality-delete';

@NgModule({
  imports: [CommonModule, ControlModule, MsfModalModule, MsfButtonModule, MsfMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, ImageFormModule, UserPickerModule, MsfSelectModule],
  declarations: [SpecialityAdd, SpecialityEdit, SpecialityDelete],
  exports: [SpecialityAdd, SpecialityEdit,  SpecialityDelete],
  providers: [SpecialityResolver, SpecialityService, {provide: SPECIALITY_SERVICE_TOKEN, useExisting: SpecialityService}]
})
export class SpecialityModule {

}
