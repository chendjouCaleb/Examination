import {Component, Inject, Input, OnInit} from '@angular/core';
import {PlannerLoader, School} from 'src/models';
import {IPlannerService, PLANNER_SERVICE_TOKEN} from "../planner.service.interface";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";

@Component({
  templateUrl: 'planner-list.html',
  selector: 'app-planner-list'
})
export class PlannerList implements OnInit {

  @Input()
  school: School;

  constructor( private _plannerLoader: PlannerLoader,
              @Inject(PLANNER_SERVICE_TOKEN) public _service: IPlannerService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.school);
    await this._plannerLoader.loadBySchool(this.school);
  }


}
