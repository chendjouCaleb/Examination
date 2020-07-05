import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestDetailsComponent} from './details/test-details.component';
import {
  MsfButtonModule,
  MsfCheckboxModule,
  MsfIconModule,
  MsfMenuModule,
  MsfModalModule,
  MsfPersonaModule, MsfTableModule
} from "fabric-docs";
import {TestAddComponent} from "examination/app/test/add/test-add.component";
import {TestResolver} from "examination/app/test/test.resolver";
import {TestService} from "examination/app/test/test.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppFormModule, ControlModule, MsfSelectModule, MsfTabModule} from "examination/controls";
import {UserPickerModule} from "examination/app/user-picker";
import {MomentModule} from "ngx-moment";
import {ExaminationModule} from "examination/app/examination";
import {TestLayoutComponent} from "./layout/test-layout.component";
import {RouterModule} from "@angular/router";
import {TestEditDateComponent} from "./date/test-edit-date.component";
import {TestListComponent} from "./list/test-list.component";
import {TestEditComponent} from "examination/app/test/edit/test-edit.component";
import {ScoreAddComponent} from "examination/app/test/score-add/score-add.component";
import {ScoreListComponent} from "examination/app/test/score-list/score-list.component";
import {TestGroupItemComponent} from "examination/app/test/test-group-item/test-group-item.component";
import {TEST_SERVICE_TOKEN} from "examination/app/test/test.service.interface";
import {TestGroupCorrectorAddComponent} from "./test-group-corrector-add/test-group-corrector-add.component";
import {TestGroupCorrectorListComponent} from "./test-group-corrector-list/test-group-corrector-list.component";
import {TestGroupSupervisorListComponent} from "./test-group-supervisor-list/test-group-supervisor-list.component";
import {TestGroupSupervisorAddComponent} from "./test-group-supervisor-add/test-group-supervisor-add.component";
import {TestGroupSecretaryAddComponent} from "./test-group-secretary-add/test-group-secretary-add.component";
import {TestGroupSecretaryListComponent} from "./test-group-secretary-list/test-group-secretary-list.component";
import {LayoutModule} from "examination/infrastructure";

@NgModule({
  declarations: [TestDetailsComponent, TestAddComponent, TestListComponent, TestLayoutComponent, TestEditDateComponent,
    TestEditComponent, ScoreAddComponent, ScoreListComponent, TestGroupItemComponent,
    TestGroupCorrectorAddComponent, TestGroupCorrectorListComponent, TestGroupSupervisorListComponent,
    TestGroupSupervisorAddComponent, TestGroupSecretaryAddComponent, TestGroupSecretaryListComponent],

  exports: [TestDetailsComponent, TestAddComponent, TestListComponent, TestLayoutComponent, TestEditDateComponent,
    TestEditComponent, ScoreAddComponent, ScoreListComponent, TestGroupItemComponent,
    TestGroupCorrectorAddComponent, TestGroupCorrectorListComponent, TestGroupSupervisorListComponent,
    TestGroupSupervisorAddComponent],

  providers: [TestResolver, TestService, {provide: TEST_SERVICE_TOKEN, useExisting: TestService}],

  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, AppFormModule, MsfCheckboxModule, MsfTableModule,
    ControlModule, MsfModalModule, MsfSelectModule, UserPickerModule, MsfMenuModule, ControlModule,
    MsfIconModule, MsfPersonaModule, MsfButtonModule, MomentModule, ExaminationModule,
    RouterModule, MsfTabModule, LayoutModule
  ]
})
export class TestModule {
}
