import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestDetailsComponent} from './details/test-details.component';
import {
  MsfButtonModule,
  MsfCheckboxModule,
  MsfIconModule,
  MsfMenuModule,
  MsfModalModule,
  MsfPersonaModule
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



@NgModule({
  declarations: [TestDetailsComponent, TestAddComponent, TestListComponent, TestLayoutComponent, TestEditDateComponent],
  exports: [ TestDetailsComponent, TestAddComponent, TestListComponent, TestLayoutComponent, TestEditDateComponent],
  providers: [ TestResolver, TestService ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, AppFormModule, MsfCheckboxModule,
    ControlModule, MsfModalModule, MsfSelectModule, UserPickerModule, MsfMenuModule, ControlModule,
    MsfIconModule, MsfPersonaModule, MsfButtonModule,  MomentModule, ExaminationModule,
    RouterModule, MsfTabModule
  ]
})
export class TestModule { }
