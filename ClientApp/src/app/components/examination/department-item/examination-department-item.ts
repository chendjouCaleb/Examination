import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ExaminationDepartment} from 'examination/entities';


@Component({
  templateUrl: 'examination-department-item.html',
  selector: 'app-examination-department-item',
  styleUrls: ['examination-department-item.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'examination-department-item ms-depth-8'
  }
})
export class ExaminationDepartmentItem {
  @Input()
  item: ExaminationDepartment;

  @Output()
  linkClick = new EventEmitter<ExaminationDepartment>();
}
