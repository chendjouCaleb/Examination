import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {SemesterStudentHttpClient, SemesterTeacherHttpClient} from "@examination/models/http";
import {Semester, SemesterLevel, SemesterStudent, SemesterTeacher} from "@examination/models/entities";
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
              <button MsActionMenuButton icon="Add" (click)="addAll()">Ajouter les étudiants</button>
              <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
          </MsActionMenu>
      </div>

      <h3 class="mt-3">Étudiants</h3>
      <div>
          <SemesterStudentList [params]="{semesterLevelId : semesterLevel.id}" [hiddenColumns]="['level', 'department']">
          </SemesterStudentList>
      </div>
  `
})
export class SemesterLevelStudentsPage implements AfterViewInit {
  semesterLevel: SemesterLevel;

  @ViewChild(SemesterStudentList)
  list: SemesterStudentList;


  constructor(private _httpClient: SemesterStudentHttpClient,
              private service: SemesterStudentService,
              private currentsItems: CurrentItems) {
    this.semesterLevel = currentsItems.get('semesterLevel');
  }

  ngAfterViewInit(): void {
  }

  addAll() {
    this.service.addAllLevel(this.semesterLevel).subscribe(items => {
      if (items) {
        this.list.addItems(...items);
      }
    })
  }

  refresh() {
    this.list.refresh();
  }
}
