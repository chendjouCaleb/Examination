import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppFormModule, ControlModule} from "examination/controls";
import {MsfButtonModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from "fabric-docs";
import {PaperService} from "examination/app/paper/paper.service";
import {PAPER_SERVICE_TOKEN} from "./paper.service.interface";
import {PaperItemComponent} from "examination/app/paper/item/paper-item.component";
import {PaperEditDateComponent} from "examination/app/paper/date/paper-edit-date.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaperSupervisorCommentComponent} from "./supervisor-comment/paper-supervisor-comment.component";
import {PaperReportComponent} from "examination/app/paper/report/paper-report.component";

@NgModule({
  declarations: [PaperItemComponent, PaperEditDateComponent, PaperSupervisorCommentComponent, PaperReportComponent],
  exports: [PaperItemComponent, PaperEditDateComponent, PaperSupervisorCommentComponent, PaperReportComponent],
  imports: [CommonModule, AppFormModule, FormsModule, ReactiveFormsModule,
    ControlModule, MsfButtonModule, MsfPersonaModule, MsfModalModule, MsfTableModule],
  providers: [PaperService, {provide: PAPER_SERVICE_TOKEN, useExisting: PaperService}]
})
export class PaperModule {

}
