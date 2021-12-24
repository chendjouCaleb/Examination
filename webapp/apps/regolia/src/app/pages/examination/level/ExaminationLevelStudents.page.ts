import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {ExaminationStudentHttpClient} from "@examination/models/http";
import {ExaminationLevel} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {ExaminationStudentList} from "../../../components/examination/student";

@Component({
  template: `
      <div class="br-2 p-2 ms-depth-8">
          <MsActionMenu>
              <button MsActionMenuButton icon="Add" (click)="addAll()">Ajouter les étudiants</button>
              <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
          </MsActionMenu>
      </div>

      <h3 class="mt-3">Étudiants de l'examen</h3>
      <div>
          <ExaminationStudentList [params]="{examinationLevelId: examinationLevel.id}"></ExaminationStudentList>
      </div>
  `
})
export class ExaminationLevelStudentsPage implements AfterViewInit {
  examinationLevel: ExaminationLevel;

  @ViewChild(ExaminationStudentList)
  list: ExaminationStudentList;


  constructor(private _httpClient: ExaminationStudentHttpClient,
              private currentsItems: CurrentItems) {
    this.examinationLevel = currentsItems.get('examinationLevel');
  }

  ngAfterViewInit(): void {
  }

  addAll() {

  }

  refresh() {
    //this.list.refresh();
  }
}
