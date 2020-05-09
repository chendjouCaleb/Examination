import {NgModule} from "@angular/core";
import {MsfButtonModule, MsfCheckboxModule, MsfIconModule} from "fabric-docs";
import {OrganisationModule} from "../organisation";
import {LayoutModule} from "examination/infrastructure";
import {RouterModule} from "@angular/router";
import {ExaminationListComponent} from "examination/app/examination/examination-list/examination-list.component";
import {ExaminationAddComponent} from "examination/app/examination/examination-add/examination-add.component";
import {ExaminationLayoutComponent} from "examination/app/examination/examination-layout/examination-layout.component";
import {MatRippleModule} from "@angular/material/core";
import {AppFormModule, ControlModule} from "examination/controls";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ExaminationResolver} from "examination/app/examination/examination.resolver";

@NgModule({
  imports: [RouterModule, MatRippleModule, MatDialogModule, MatDatepickerModule,
    MsfCheckboxModule, AppFormModule, ControlModule,
    MsfIconModule, MsfButtonModule, LayoutModule, OrganisationModule],
  declarations: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent],
  exports: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent],
  providers: [ ExaminationResolver ]
})
export class ExaminationModule {

}
