import {AfterViewInit, Component, Inject, Input, ViewChild} from '@angular/core';
import {Planner, PlannerLoader, School} from 'src/models';
import {IPlannerService, PLANNER_SERVICE_TOKEN} from '../planner.service.interface';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'planner-list.html',
  selector: 'app-planner-list'
})
export class PlannerList implements AfterViewInit {

  @Input()
  school: School;

  @ViewChild(MsTable)
  table: MsTable;

  isLoading: boolean = true;

  constructor(private _plannerLoader: PlannerLoader,
              @Inject(PLANNER_SERVICE_TOKEN) public _service: IPlannerService) {
  }


  async ngAfterViewInit(): Promise<void> {
    try {
      AssertHelpers.isNotNull(this.school);
      await this._plannerLoader.loadBySchool(this.school);
      this.table.unshift(...this.school.planners.toArray());
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }

  }

  addPlanners() {
    this._service.addPlanners(this.school).then(planners => {
      this.table.unshift(...planners.toArray())
    })
  }

  deletePlanner(planner: Planner) {
    this._service.deletePlanner(planner).then(deleted => {
      if (deleted) {
        this.table.remove(this.table.items.find(item => item.id === planner.id));
      }
    });
  }

}
