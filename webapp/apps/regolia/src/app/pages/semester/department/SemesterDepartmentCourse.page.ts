import {Component, ViewChild} from "@angular/core";
import {SemesterCourseHttpClient} from "@examination/models/http";
import {SemesterDepartment} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {SemesterCourseList, SemesterCourseService} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Add" (click)="addAll()">Ajouter des cours</button>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Cours</h3>
    <div>
        <SemesterCourseList [params]="{semesterDepartmentId: semesterDepartment.id}" 
                            [hiddenColumns]="['semester', 'department', 'year']">
            
        </SemesterCourseList>
    </div>
  `
})
export class SemesterDepartmentCoursePage  {
  semesterDepartment: SemesterDepartment;

  @ViewChild(SemesterCourseList)
  list: SemesterCourseList;


  constructor(private _httpClient: SemesterCourseHttpClient,
              private service: SemesterCourseService,
              private currentsItems: CurrentItems) {
    this.semesterDepartment = currentsItems.get('semesterDepartment');
  }

  addAll() {
    this.service.addSemesterDepartmentCourses(this.semesterDepartment).subscribe(items => {
      if(items) {
        this.list.addItems(...items);
      }
    })
  }

  refresh() {
    this.list.refresh();
  }
}
