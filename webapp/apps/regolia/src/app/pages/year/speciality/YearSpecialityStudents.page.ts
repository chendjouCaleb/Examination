import {Component, ViewChild} from "@angular/core";
import {YearSpeciality} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {YearStudentList} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Étudiants</h3>
    <YearStudentList [hiddenColumns]="['department', 'speciality']"
            [params]="{yearSpecialityId : yearSpeciality.id}"></YearStudentList>
  `
})
export class YearSpecialityStudentsPage {
  yearSpeciality: YearSpeciality;

  @ViewChild(YearStudentList)
  list: YearStudentList;


  constructor(private currentsItems: CurrentItems) {
    this.yearSpeciality = currentsItems.get('yearSpeciality');
  }

  refresh() {
    this.list.refresh();
  }
}
