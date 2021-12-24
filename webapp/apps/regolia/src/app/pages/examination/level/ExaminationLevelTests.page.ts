import {Component} from "@angular/core";
import {ExaminationLevel} from "@examination/entities";
import {CurrentItems} from "../../../current-items";
import {TestAddService} from "../../../components/test/add";

@Component({
  template: `
      <h3>Épreuves</h3>
      <MsActionMenu class="ms-depth-8 p-2">
          <button MsActionMenuButton icon="Add" (click)="addTest()">Programmer une épreuve</button>
      </MsActionMenu>

      <div class="mt-3">
          <TestList [params]="{examinationLevelId: examinationLevel.id}"></TestList>
      </div>
  `
})
export class ExaminationLevelTestsPage {
  examinationLevel: ExaminationLevel;

  constructor(private items: CurrentItems, private _service: TestAddService) {
    this.examinationLevel = items.get('examinationLevel');
  }

  addTest() {
    this._service.add({examinationLevel: this.examinationLevel}).subscribe(test => {
      if (test) {

      }
    })
  }
}
