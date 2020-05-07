import {NgModule} from "@angular/core";
import {MsfButtonModule, MsfIconModule} from "fabric-docs";
import {OrganisationModule} from "../organisation";
import {LayoutModule} from "examination/infrastructure";
import {RouterModule} from "@angular/router";
import {ExaminationListComponent} from "examination/app/examination/examination-list/examination-list.component";
import {ExaminationAddComponent} from "examination/app/examination/examination-add/examination-add.component";
import {ExaminationLayoutComponent} from "examination/app/examination/examination-layout/examination-layout.component";

@NgModule({
  imports: [RouterModule, MsfIconModule, MsfButtonModule, LayoutModule, OrganisationModule],
  declarations: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent],
  exports: [ExaminationListComponent, ExaminationAddComponent, ExaminationLayoutComponent ]
})
export class ExaminationModule {

}
