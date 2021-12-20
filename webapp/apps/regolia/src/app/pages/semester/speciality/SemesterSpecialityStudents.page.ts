import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {SemesterStudentHttpClient, SemesterTeacherHttpClient} from "@examination/models/http";
import {Semester, SemesterSpeciality, SemesterStudent, SemesterTeacher} from "@examination/models/entities";
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
          <SemesterStudentList [params]="{semesterSpecialityId : semesterSpeciality.id}" 
                               [hiddenColumns]="['speciality', 'department']">
          </SemesterStudentList>
      </div>
  `
})
export class SemesterSpecialityStudentsPage {
  semesterSpeciality: SemesterSpeciality;

  @ViewChild(SemesterStudentList)
  list: SemesterStudentList;


  constructor(private _httpClient: SemesterStudentHttpClient,
              private service: SemesterStudentService,
              private currentsItems: CurrentItems) {
    this.semesterSpeciality = currentsItems.get('semesterSpeciality');
  }

  refresh() {
    this.list.refresh();
  }
}
