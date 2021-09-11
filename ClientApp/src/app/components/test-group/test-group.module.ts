import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestGroupAdd} from './add/test-group-add';
import {TestGroupResolver} from './test-group.resolver';
import {TestGroupService} from './test-group.service';
import {TEST_GROUP_SERVICE_TOKEN} from './test-group.service.interface';
import {TestGroupCorrectorAdd} from './test-group-corrector-add/test-group-corrector-add';
import {TestGroupCorrectorList} from './test-group-corrector-list/test-group-corrector-list';
import {TestGroupSecretaryAdd} from './test-group-secretary-add/test-group-secretary-add';
import {TestGroupSecretaryList} from './test-group-secretary-list/test-group-secretary-list';
import {TestGroupSupervisorAdd} from './test-group-supervisor-add/test-group-supervisor-add';
import {TestGroupSupervisorList} from './test-group-supervisor-list/test-group-supervisor-list';
import {TestGroupDetails} from './details/test-group-details';
import {MomentModule} from 'ngx-moment';
import {TestGroupItem} from './item/test-group-item';
import {RouterModule} from '@angular/router';
import {
  MsButtonModule, MsCheckboxModule,
  MsContextMenuModule,
  MsDialogModule,
  MsDropdownModule, MsPersonaModule, MsSelectModule,
  MsTableModule
} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, ControlModule, MsDialogModule, MsButtonModule, MsDropdownModule,
    MsContextMenuModule, FormsModule, MsTableModule, MsPersonaModule, MomentModule, RouterModule,
    ReactiveFormsModule, AppFormModule, UserPickerModule, MsSelectModule, MsCheckboxModule],

  declarations: [TestGroupAdd, TestGroupItem, TestGroupDetails, TestGroupCorrectorAdd,
    TestGroupCorrectorList, TestGroupDetails, TestGroupSecretaryAdd, TestGroupSecretaryList, TestGroupSupervisorAdd,
    TestGroupSupervisorList],

  exports: [TestGroupAdd, TestGroupItem, TestGroupDetails, TestGroupCorrectorAdd, TestGroupCorrectorList,
    TestGroupDetails,
    TestGroupSecretaryAdd, TestGroupSecretaryList, TestGroupSupervisorAdd, TestGroupSupervisorList],

  providers: [TestGroupResolver, TestGroupService, {provide: TEST_GROUP_SERVICE_TOKEN, useExisting: TestGroupService}]
})
export class TestGroupModule {

}
