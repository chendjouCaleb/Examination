import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlModule} from "examination/controls";
import {MsfButtonModule, MsfModalModule, MsfTableModule} from "fabric-docs";
import {PaperService} from "examination/app/paper/paper.service";
import {PAPER_SERVICE_TOKEN} from "./paper.service.interface";
import {PaperItemComponent} from "examination/app/paper/item/paper-item.component";

@NgModule({
  declarations: [ PaperItemComponent ],
  exports: [ PaperItemComponent ],
  imports: [CommonModule, ControlModule, MsfButtonModule, MsfModalModule, MsfTableModule],
  providers: [PaperService, {provide: PAPER_SERVICE_TOKEN, useExisting: PaperService}]
})
export class PaperModule {

}
