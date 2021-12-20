import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {SemesterStudentHttpClient, SemesterTeacherHttpClient} from "@examination/models/http";
import {
  Semester,
  SemesterLevelSpeciality,
  SemesterSpeciality,
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

@Component({
  template: `
      <div class="br-2 p-2 ms-depth-8">
          <MsActionMenu>
              <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
          </MsActionMenu>
      </div>

      <h3 class="mt-3">Étudiants</h3>
      <div>
          <SemesterStudentList [params]="{semesterLevelSpecialityId : semesterLevelSpeciality.id}" 
                               [hiddenColumns]="['speciality', 'level', 'department']">
          </SemesterStudentList>
      </div>
  `
})
export class SemesterLevelSpecialityStudentsPage {
  semesterLevelSpeciality: SemesterLevelSpeciality;

  @ViewChild(SemesterStudentList)
  list: SemesterStudentList;


  constructor(private _httpClient: SemesterStudentHttpClient,
              private service: SemesterStudentService,
              private currentsItems: CurrentItems) {
    this.semesterLevelSpeciality = currentsItems.get('semesterLevelSpeciality');
  }

  refresh() {
    this.list.refresh();
  }
}
