import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {ExaminationStudentHttpClient} from "@examination/models/http";
import {ExaminationSpeciality} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {ExaminationStudentList} from "../../../components/examination/student/student-list/examination-student-list";

@Component({
  template: `
      <div class="br-2 p-2 ms-depth-8">
          <MsActionMenu>
              <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
          </MsActionMenu>
      </div>

      <h3 class="mt-3">Étudiants de l'examen</h3>
      <div>
          <ExaminationStudentList [params]="{examinationSpecialityId: examinationSpeciality.id}"></ExaminationStudentList>
      </div>
  `
})
export class ExaminationSpecialityStudentsPage implements AfterViewInit {
  examinationSpeciality: ExaminationSpeciality;

  @ViewChild(ExaminationStudentList)
  list: ExaminationStudentList;


  constructor(private _httpClient: ExaminationStudentHttpClient,
              private currentsItems: CurrentItems) {
    this.examinationSpeciality = currentsItems.get('examinationSpeciality');
  }

  ngAfterViewInit(): void {
  }

  addAll() {

  }

  refresh() {
    //this.list.refresh();
  }
}
