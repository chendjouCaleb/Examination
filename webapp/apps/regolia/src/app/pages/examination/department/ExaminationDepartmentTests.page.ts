import {Component} from "@angular/core";
import {CurrentItems} from "../../../current-items";
import {ExaminationDepartment} from "@examination/entities";
import {TestAddService} from "../../../components/test/add";

@Component({
  template: `
    
      <h3>Épreuves</h3>

      <MsActionMenu class="ms-depth-8 p-2">
          <button MsActionMenuButton icon="Add" (click)="addTest()">Programmer une épreuve</button>
      </MsActionMenu>

      <div class="mt-3">
          <TestList [params]="{examinationDepartmentId: examinationDepartment.id}"></TestList>
      </div>
  `
})
export class ExaminationDepartmentTestsPage {
  examinationDepartment: ExaminationDepartment;

  constructor(private items: CurrentItems, private _service: TestAddService) {
    this.examinationDepartment = items.get('examinationDepartment');
  }

  addTest() {
    this._service.add({examinationDepartment: this.examinationDepartment})
  }
}
