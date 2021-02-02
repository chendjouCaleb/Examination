import {Component, Inject, Input, OnInit} from '@angular/core';
import {CorrectorLoader, Department} from 'src/models';
import {CurrentItems} from 'src/app/current-items';
import {CORRECTOR_SERVICE_TOKEN, ICorrectorService} from "../corrector.service.interface";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";

@Component({
  templateUrl: 'corrector-list.html',
  selector: 'app-corrector-list'
})
export class CorrectorList implements OnInit {

  @Input()
  department: Department;

  constructor( private _correctorLoader: CorrectorLoader,
              @Inject(CORRECTOR_SERVICE_TOKEN) public _service: ICorrectorService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.department);
    await this._correctorLoader.loadByDepartment(this.department);
  }


}
