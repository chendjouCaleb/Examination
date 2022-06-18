import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SemesterExaminationList} from "./SemesterExaminationList";
import {MsButtonModule, MsSpinnerModule, MsTableModule} from "@ms-fluent/components";
import {RouterModule} from "@angular/router";
import {ControlModule, MsBadgeModule} from "src/controls";
import {ExaminationListItem} from "./ExaminationListItem";
import {MomentModule} from "ngx-moment";
import {ExaminationCardModule} from "../card/examination-card.module";
import {ExaminationList} from "./examination-list";

@NgModule({
  imports: [CommonModule, MsTableModule, MsSpinnerModule, RouterModule, ControlModule, MsButtonModule,
    MsBadgeModule, MomentModule, ExaminationCardModule],
  declarations: [ SemesterExaminationList, ExaminationListItem, ExaminationList ],
    exports: [SemesterExaminationList, ExaminationList, ExaminationListItem]
})
export class ExaminationListModule {

}
