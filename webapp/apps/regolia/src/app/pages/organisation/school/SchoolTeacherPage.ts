import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {TeacherHttpClient} from "@examination/http";
import {TeacherLoader} from "@examination/loaders";
import {TeacherList} from "../../../components/member/teacher/list";

@Component({
  template: `
      <MsActionMenu class="ms-depth-8 p-2">
          <button *ngIf="school.isPrincipalUser" [disabled]="true" msActionMenuButton icon="Add" (click)="addTeachers()">
              Ajouter <span class="ms-hiddenSm">des enseignants</span></button>
      </MsActionMenu>
      <h4 class="my-2">Enseignants</h4>
      <TeacherList [teachers]="[]"></TeacherList>`
})
export class SchoolTeacherPage implements AfterViewInit {
  school: School;

  @ViewChild(TeacherList)
  teacherList: TeacherList;

  constructor(items: CurrentItems,
              private _teacherHttpClient: TeacherHttpClient,
              private _loader: TeacherLoader,
              public _router: Router) {
    this.school = items.get('school');
  }

  ngAfterViewInit(): void {
    this._teacherHttpClient.list({schoolId: this.school.id}).then(items => {
      this.teacherList.addItems(...items.toArray());
    })
  }

  addTeachers() {
  }
}
