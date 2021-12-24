import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {
  ExaminationStudentHttpClient,
  SemesterStudentHttpClient,
  SemesterTeacherHttpClient
} from "@examination/models/http";
import {
  Examination,
  Semester,
  SemesterDepartment,
  SemesterStudent,
  SemesterTeacher
} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {
  SemesterStudentList,
  SemesterStudentService,
  SemesterTeacherList,
  SemesterTeacherService
} from "@examination/components";
import {ExaminationStudentList} from "../../../components/examination/student/student-list/examination-student-list";

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
          <ExaminationStudentList [params]="{examinationId: examination.id}"></ExaminationStudentList>
      </div>
  `
})
export class ExaminationStudentsPage implements AfterViewInit {
  examination: Examination;

  @ViewChild(ExaminationStudentList)
  list: ExaminationStudentList;


  constructor(private _httpClient: ExaminationStudentHttpClient,
              private currentsItems: CurrentItems) {
    this.examination = currentsItems.get('examination');
  }

  ngAfterViewInit(): void {
  }

  addAll() {

  }

  refresh() {
    //this.list.refresh();
  }
}
