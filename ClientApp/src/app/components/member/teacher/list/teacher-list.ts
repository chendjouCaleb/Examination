import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Department, Teacher, TeacherLoader} from 'src/models';
import {ITeacherService, TEACHER_SERVICE_TOKEN} from '../teacher.service.interface';
import {AssertHelpers} from '@positon/collections/dist/helpers/assert-helpers';
import {MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'teacher-list.html',
  selector: 'app-teacher-list'
})
export class TeacherList implements OnInit {

  @Input()
  department: Department;

  @ViewChild(MsTable)
  table: MsTable;

  teachers: Teacher[] = [];

  isLoading: boolean = true;

  constructor( private _teacherLoader: TeacherLoader,
               @Inject(TEACHER_SERVICE_TOKEN) public _service: ITeacherService) {
  }

  async ngOnInit() {
    try {
      AssertHelpers.isNotNull(this.department);
      await this._teacherLoader.loadByDepartment(this.department);
      this.table.unshift(...this.department.teachers.toArray());
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }

  }

  addTeachers() {
    this._service.addTeachers(this.department).then(items => this.table.unshift(...items));
  }

  deleteTeacher(item: Teacher) {
    this._service.deleteTeacher(item).then(deleted => {
      if (deleted) {
        this.table.remove(item);
      }
    })
  }


}
