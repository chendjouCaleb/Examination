import {Component, ViewChild} from "@angular/core";
import {YearLevelSpeciality} from "@examination/models/entities";
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
    <YearStudentList [hiddenColumns]="['department', 'level']"
            [params]="{yearLevelSpecialityId : yearLevelSpeciality.id}"></YearStudentList>
  `
})
export class YearLevelSpecialityStudentsPage {
  yearLevelSpeciality: YearLevelSpeciality;

  @ViewChild(YearStudentList)
  list: YearStudentList;


  constructor(private currentsItems: CurrentItems) {
    this.yearLevelSpeciality = currentsItems.get('yearLevelSpeciality');
  }

  refresh() {
    this.list.refresh();
  }
}
