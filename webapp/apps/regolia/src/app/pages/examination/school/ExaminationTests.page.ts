import {Component} from "@angular/core";
import {Examination} from "@examination/entities";
import {CurrentItems} from "../../../current-items";
import {TestAddService} from "../../../components/test/add";

@Component({
  template: `
      <MsActionMenu class="ms-depth-8 p-2">
          <button MsActionMenuButton icon="Add" (click)="addTest()">Programmer une épreuve</button>
      </MsActionMenu>
      
      <h3>Épreuves de l'examen</h3>

      <TestList [params]="{examinationId: examination.id}"></TestList>
  `
})
export class ExaminationTestsPage {
  examination: Examination;

  constructor(private items: CurrentItems, private _service: TestAddService) {
    this.examination = items.get('examination');
  }

  addTest() {
    this._service.add({examination: this.examination})
  }
}
