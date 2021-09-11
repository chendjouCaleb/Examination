import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, ImageFormModule, UserPickerModule} from 'examination/controls';
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
import {ApplicationModule} from 'examination/app/components/member/application';
import {DepartmentList} from 'examination/app/components/department/list/department-list';
import {RouterModule} from '@angular/router';
import {
  MsButtonModule,
  MsContextMenuModule,
  MsDialogModule,
  MsDropdownModule,
  MsPersonaModule
} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, ControlModule, MsDialogModule, MsButtonModule, MsContextMenuModule, MsDropdownModule, FormsModule,
    ReactiveFormsModule, AppFormModule, ImageFormModule, UserPickerModule, MsPersonaModule, ApplicationModule, RouterModule ],
  declarations: [DepartmentAdd, DepartmentEdit, DepartmentCard, DepartmentBanner, DepartmentImage,
    DepartmentCoverImage, DepartmentDelete, DepartmentList],
  exports: [DepartmentAdd, DepartmentEdit, DepartmentCard, DepartmentBanner, DepartmentImage,
    DepartmentCoverImage, DepartmentDelete, DepartmentList],
  providers: [DepartmentResolver, DepartmentService, {provide: DEPARTMENT_SERVICE_TOKEN, useExisting: DepartmentService}]
})
export class DepartmentModule {

}
