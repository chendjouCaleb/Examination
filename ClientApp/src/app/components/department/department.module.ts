import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, ImageFormModule, UserPickerModule} from 'examination/controls';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule} from 'fabric-docs';
import {DepartmentAdd} from './add/department-add';
import {DepartmentEdit} from './edit/department-edit';
import {DepartmentService} from './department.service';
import {DEPARTMENT_SERVICE_TOKEN} from './department.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DepartmentResolver} from './department.resolver';
import {DepartmentCard} from './card/department-card';
import {DepartmentBanner} from './banner/department-banner';
import {DepartmentImage} from './image/department-image';
import {DepartmentCoverImage} from './cover-image/department-cover-image';
import {DepartmentDelete} from './delete/department-delete';
import {ApplicationModule} from "examination/app/components/member/application";

@NgModule({
  imports: [CommonModule, ControlModule, MsfModalModule, MsfButtonModule, MsfMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, ImageFormModule, UserPickerModule, MsfPersonaModule, ApplicationModule],
  declarations: [DepartmentAdd, DepartmentEdit, DepartmentCard, DepartmentBanner, DepartmentImage,
    DepartmentCoverImage, DepartmentDelete],
  exports: [DepartmentAdd, DepartmentEdit, DepartmentCard, DepartmentBanner, DepartmentImage,
    DepartmentCoverImage, DepartmentDelete],
  providers: [DepartmentResolver, DepartmentService, {provide: DEPARTMENT_SERVICE_TOKEN, useExisting: DepartmentService}]
})
export class DepartmentModule {

}
