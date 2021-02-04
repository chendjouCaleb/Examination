import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Corrector, CorrectorLoader, Department, Supervisor} from 'src/models';
import {CORRECTOR_SERVICE_TOKEN, ICorrectorService} from '../corrector.service.interface';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {MsTable} from '@ms-fluent/table';

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

  constructor( private _correctorLoader: CorrectorLoader,
               @Inject(CORRECTOR_SERVICE_TOKEN) public _service: ICorrectorService) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.department);
    await this._correctorLoader.loadByDepartment(this.department);
    this.table.unshift(...this.department.correctors);
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
