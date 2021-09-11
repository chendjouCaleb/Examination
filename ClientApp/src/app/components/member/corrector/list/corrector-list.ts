import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Corrector, CorrectorLoader, Department} from 'src/models';
import {CORRECTOR_SERVICE_TOKEN, ICorrectorService} from '../corrector.service.interface';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {MsTable} from "@ms-fluent/components";

@Component({
  templateUrl: 'corrector-list.html',
  selector: 'app-corrector-list'
})
export class CorrectorList implements OnInit {

  @Input()
  department: Department;

  @ViewChild(MsTable)
  table: MsTable<Corrector>;

  correctors: Corrector[] = [];

  isLoading: boolean = true;

  constructor( private _correctorLoader: CorrectorLoader,
               @Inject(CORRECTOR_SERVICE_TOKEN) public _service: ICorrectorService) {
  }

  async ngOnInit() {
    try {
      AssertHelpers.isNotNull(this.department);
      await this._correctorLoader.loadByDepartment(this.department);
      this.table.unshift(...this.department.correctors);
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }

  }

  addCorrectors() {
    this._service.addCorrectors(this.department).then(items => this.table.unshift(...items));
  }

  deleteCorrector(item: Corrector) {
    this._service.deleteCorrector(item).then(deleted => {
      if (deleted) {
        this.table.remove(item);
      }
    })
  }
}
