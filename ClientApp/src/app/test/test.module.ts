import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDetailsComponent } from './test-details/test-details.component';
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
import {AppFormModule, ControlModule, MsfSelectModule} from "examination/controls";
import {UserPickerModule} from "examination/app/user-picker";
import {LayoutModule} from "examination/infrastructure";
import {TestListComponent} from "examination/app/test/test-list/test-list.component";
import {MomentModule} from "ngx-moment";



@NgModule({
  declarations: [TestDetailsComponent, TestAddComponent, TestListComponent],
  exports: [ TestDetailsComponent, TestAddComponent, TestListComponent],
  providers: [ TestResolver, TestService ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, AppFormModule, MsfCheckboxModule,
    ControlModule, MsfModalModule, MsfSelectModule, UserPickerModule, MsfMenuModule,
    MsfIconModule, MsfPersonaModule, MsfButtonModule, LayoutModule, MomentModule
  ]
})
export class TestModule { }
