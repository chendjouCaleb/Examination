import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {YearStudentHttpClient} from "@examination/models/http";
import {Year, YearStudent} from "@examination/models/entities";
import {YearStudentLoader} from "@examination/models/loaders";
import {CurrentItems} from "../../../current-items";
import {YearStudentList, YearStudentService} from "@examination/components";

@Component({
  template: `
    <div class="br-2 p-2 ms-depth-8">
        <MsActionMenu>
            <button MsActionMenuButton icon="Add" (click)="addAll()">Ajouter les étudiants</button>
            <button MsActionMenuButton icon="Refresh" (click)="refresh()">Recharger</button>
        </MsActionMenu>
    </div>
    
    <h3 class="mt-3">Étudiants</h3>
    <YearStudentList [params]="{yearId : year.id}"></YearStudentList>
  `
})
export class YearSchoolStudentPage implements AfterViewInit {
  year: Year;

  @ViewChild(YearStudentList)
  list: YearStudentList;


  constructor(private _httpClient: YearStudentHttpClient,
              private currentsItems: CurrentItems,
              private service: YearStudentService,
              private _loader: YearStudentLoader) {
    this.year = currentsItems.get('year');
  }

  ngAfterViewInit(): void {

  }

  addAll() {
    this.service.addAll(this.year).subscribe(items => {
      if(items) {
        this.list.addItems(...items);
      }
    })
  }

  refresh() {
    this.list.refresh();
  }
}
