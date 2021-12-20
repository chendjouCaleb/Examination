import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {SemesterStudentHttpClient, SemesterTeacherHttpClient} from "@examination/models/http";
import {Semester, SemesterDepartment, SemesterStudent, SemesterTeacher} from "@examination/models/entities";
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
              <button MsActionMenuButton icon="Add" (click)="addAll()">Ajouter les enseignants</button>
              <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
          </MsActionMenu>
      </div>

      <h3 class="mt-3">Étudiants</h3>
      <div>
          <SemesterStudentList [params]="{semesterId : semester.id}" [hiddenColumns]="['semester']"></SemesterStudentList>
      </div>
  `
})
export class SemesterStudentsPage implements AfterViewInit {
  semester: Semester;

  @ViewChild(SemesterStudentList)
  list: SemesterStudentList;


  constructor(private _httpClient: SemesterStudentHttpClient,
              private service: SemesterStudentService,
              private currentsItems: CurrentItems) {
    this.semester = currentsItems.get('semester');
  }

  ngAfterViewInit(): void {
  }

  addAll() {
    this.service.addAll(this.semester).subscribe(items => {
      if (items) {
        this.list.addItems(...items);
      }
    })
  }

  refresh() {
    this.list.refresh();
  }
}
