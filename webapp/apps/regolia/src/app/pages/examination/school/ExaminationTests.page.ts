import {Component, ViewChild} from "@angular/core";
import {Examination} from "@examination/entities";
import {CurrentItems} from "../../../current-items";
import {TestAddService} from "../../../components/test/add";
import {TestList} from "../../../components/test/list";

@Component({
  template: `
      <MsActionMenu class="ms-depth-8 p-2">
          <button MsActionMenuButton icon="Add" (click)="addTest()">Programmer une épreuve</button>
      </MsActionMenu>
      
      <h3 class="my-3">Épreuves de l'examen</h3>

      <TestList [params]="{examinationId: examination.id}"></TestList>
  `
})
export class ExaminationTestsPage {
  examination: Examination;

  @ViewChild(TestList)
  testList: TestList;

  constructor(private items: CurrentItems, private _service: TestAddService) {
    this.examination = items.get('examination');
  }

  addTest() {
    this._service.add({examination: this.examination}).subscribe(test => {
      if (test) {
        this.testList.addItem(test);
      }
    })
  }
}
