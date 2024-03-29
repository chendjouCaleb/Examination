﻿import {Component, Input} from '@angular/core';
import {Department} from 'examination/entities';

@Component({
  templateUrl: 'department-card.html',
  selector: 'app-department-card'
})
export class DepartmentCard {
  @Input()
  department: Department;
}
