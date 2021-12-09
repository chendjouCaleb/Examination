import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {YearTeacherHttpClient} from "@examination/models/http";
import {YearDepartment, YearTeacher} from "@examination/models/entities";
import {CurrentItems} from "../../../current-items";
import {YearTeacherList, YearTeacherService} from "@examination/components";

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
        <YearTeacherList [items]="items" [hiddenColumns]="['year']"></YearTeacherList>
    </div>
  `
})
export class YearDepartmentTeacherPage implements AfterViewInit {

  items: YearTeacher[];
  yearDepartment: YearDepartment;

  @ViewChild(YearTeacherList)
  list: YearTeacherList;


  constructor(private _httpClient: YearTeacherHttpClient,
              private service: YearTeacherService,
              private currentsItems: CurrentItems) {
    this.yearDepartment = currentsItems.get('yearDepartment');
  }

  ngAfterViewInit(): void {
    this._httpClient.listByYearDepartment(this.yearDepartment).then(items => {
      this.items = items.toArray();
    });
  }

  addAll() {

  }

  refresh() {
    this.items = [];
    this._httpClient.listByYearDepartment(this.yearDepartment).then(items => {
      this.items = items.toArray();
      this.list.refresh(this.items);
    });
  }
}
