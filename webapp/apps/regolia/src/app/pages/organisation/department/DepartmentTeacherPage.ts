import {Component, ViewChild} from "@angular/core";
import {Department, Teacher} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {TeacherHttpClient} from "@examination/http";
import {TeacherList, TeacherService} from "@examination/components";

@Component({
  template: `
      <MsActionMenu class="ms-depth-8 p-2">
          <button *ngIf="department.isDirector" msActionMenuButton icon="Add" (click)="addTeacher()">
              Ajouter <span class="ms-hiddenSm">des enseignants</span></button>
      </MsActionMenu>
      <h4 class="my-2">Enseignants</h4>
      <TeacherList [teachers]="[]" class="mt-2"></TeacherList>
  `
})
export class DepartmentTeacherPage {
  department: Department;
  teachers: Teacher[];

  @ViewChild(TeacherList)
  teacherList: TeacherList;



  constructor(items: CurrentItems, public _router: Router,
              private service: TeacherService,
              private _teacherHttpClient: TeacherHttpClient) {
    this.department = items.get('department');
  }

  ngAfterViewInit(): void {
    this._teacherHttpClient.list({departmentId: this.department.id}).then(items => {
      this.teacherList.addItems(...items.toArray());
    })
  }

  addTeacher() {
    this.service.addTeachers(this.department).then(items => {
      if(items) {
        this.teacherList.addItems(...items);
      }
    })
  }
}
