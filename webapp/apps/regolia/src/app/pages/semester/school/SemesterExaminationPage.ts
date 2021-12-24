import {Component, ViewChild} from "@angular/core";
import {School, Semester} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {ExaminationList, ExaminationService} from "../../../components/examination";

@Component({
  template: `
      <h4 class="mt-3">Examens du semestre</h4>
      <MsActionMenu class="ms-depth-8 p-2 my-2">
          <button MsActionMenuButton icon="Add" (click)="add()">Ajouter un examination</button>
      </MsActionMenu>
      <ExaminationList class="mt-3" [params]="{semesterId: semester.id}"></ExaminationList>`
})
export class SemesterExaminationPage {
  semester: Semester;
  @ViewChild(ExaminationList)
  list: ExaminationList;

  constructor(items: CurrentItems, public _router: Router, public service: ExaminationService) {
    this.semester = items.get('semester');
  }

  add() {
    this.service.add(this.semester).subscribe(examination => {
      if(examination) {
        this.list.add(examination);
      }
    })
  }
}
