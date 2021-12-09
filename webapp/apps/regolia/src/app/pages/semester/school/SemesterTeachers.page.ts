import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {SemesterTeacherHttpClient} from "@examination/models/http";
import {Semester, SemesterDepartment, SemesterTeacher} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {SemesterTeacherList, SemesterTeacherService} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Add" (click)="addAll()">Ajouter les enseignants</button>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Enseignants</h3>
    <div *ngIf="items">
        <SemesterTeacherList [items]="items" [hiddenColumns]="['semester']"></SemesterTeacherList>
    </div>
  `
})
export class SemesterTeachersPage implements AfterViewInit {

  items: SemesterTeacher[];
  semester: Semester;

  @ViewChild(SemesterTeacherList)
  list: SemesterTeacherList;


  constructor(private _httpClient: SemesterTeacherHttpClient,
              private service: SemesterTeacherService,
              private currentsItems: CurrentItems) {
    this.semester = currentsItems.get('semester');
  }

  ngAfterViewInit(): void {
    this._httpClient.listBySemester(this.semester).then(items => {
      this.items = items.toArray();
    });
  }

  addAll() {
    this.service.addSemesterTeachers(this.semester).then(items => {
      if(items) {
        this.list.addItems(...items);
      }
    })
  }

  refresh() {
    this.items = [];
    this._httpClient.listBySemester(this.semester).then(items => {
      this.items = items.toArray();
      this.list.refresh(this.items);
    });
  }
}
