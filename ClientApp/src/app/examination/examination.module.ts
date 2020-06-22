import {NgModule} from "@angular/core";
import {MsfButtonModule, MsfCheckboxModule, MsfIconModule, MsfModalModule} from "fabric-docs";
import {OrganisationModule} from "../organisation";
import {LayoutModule} from "examination/infrastructure";
import {RouterModule} from "@angular/router";
import {ExaminationListComponent} from "examination/app/examination/examination-list/examination-list.component";
import {ExaminationAddComponent} from "examination/app/examination/examination-add/examination-add.component";
import {ExaminationLayoutComponent} from "examination/app/examination/examination-layout/examination-layout.component";
import {MatRippleModule} from "@angular/material/core";
import {AppFormModule, ControlModule} from "examination/controls";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ExaminationResolver} from "examination/app/examination/examination.resolver";
import {ExaminationService} from "examination/app/examination/examination.service";
import {CanGroupExaminationAlert} from "examination/app/examination/ExaminationCanGroupAlert";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule, RouterModule, MatRippleModule, MsfModalModule, MatDatepickerModule,
    MsfCheckboxModule, AppFormModule, ControlModule,
    MsfIconModule, MsfButtonModule, LayoutModule, OrganisationModule],
  declarations: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent, CanGroupExaminationAlert],
  exports: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent, CanGroupExaminationAlert],
  providers: [ ExaminationResolver, ExaminationService ]
})
export class ExaminationModule {

}
