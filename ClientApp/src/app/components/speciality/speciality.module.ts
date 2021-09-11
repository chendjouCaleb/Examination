import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, ImageFormModule, UserPickerModule} from 'examination/controls';
import {SpecialityAdd} from './add/speciality-add';
import {SpecialityEdit} from './edit/speciality-edit';
import {SpecialityService} from './speciality.service';
import {SPECIALITY_SERVICE_TOKEN} from './speciality.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpecialityResolver} from './speciality.resolver';
import {SpecialityDelete} from './delete/speciality-delete';
import {SpecialityLevelAdd} from './level/speciality-level-add';
import {
  MsButtonModule,
  MsContextMenuModule,
  MsDialogModule,
  MsDropdownModule,
  MsSelectModule
} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, ControlModule, MsDialogModule, MsButtonModule, MsDropdownModule, MsContextMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, ImageFormModule, UserPickerModule, MsSelectModule],
  declarations: [SpecialityAdd, SpecialityEdit, SpecialityDelete, SpecialityLevelAdd],
  exports: [SpecialityAdd, SpecialityEdit, SpecialityDelete, SpecialityLevelAdd],
  providers: [SpecialityResolver, SpecialityService, {
    provide: SPECIALITY_SERVICE_TOKEN,
    useExisting: SpecialityService
  }]
})
export class SpecialityModule {

}
