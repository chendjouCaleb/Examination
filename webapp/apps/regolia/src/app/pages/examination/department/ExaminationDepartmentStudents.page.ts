import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {ExaminationDepartment} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
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
          <ExaminationStudentList [params]="{examinationDepartmentId: examinationDepartment.id}">
          </ExaminationStudentList>
      </div>
  `
})
export class ExaminationDepartmentStudentsPage implements AfterViewInit {
  examinationDepartment: ExaminationDepartment;



  @ViewChild(ExaminationStudentList)
  list: ExaminationStudentList;


  constructor(private items: CurrentItems) {
    this.examinationDepartment = items.get('examinationDepartment');
  }

  ngAfterViewInit(): void {
  }

  addAll() {

  }

  refresh() {
    //this.list.refresh();
  }
}
