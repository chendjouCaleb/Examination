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

@NgModule({
  imports: [RouterModule, MatRippleModule, MsfModalModule, MatDatepickerModule,
    MsfCheckboxModule, AppFormModule, ControlModule,
    MsfIconModule, MsfButtonModule, LayoutModule, OrganisationModule],
  declarations: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent],
  exports: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent],
  providers: [ ExaminationResolver, ExaminationService ]
})
export class ExaminationModule {

}
