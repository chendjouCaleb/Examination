﻿import {IStudentService, STUDENT_SERVICE_TOKEN} from '../student.service.interface';
import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  Department,
  Level,
  LevelSpeciality,
  School, Speciality,
  Student,
  StudentHttpClient,
  StudentLoader
} from 'examination/models';
import {MsCheckboxGroup, MsPaginator, MsPaginatorItemsFn, MsTable} from '@ms-fluent/components';
import {StudentAddOptions} from '../add/student-add-options';

@Component({
  templateUrl: 'student-list.html',
  selector: 'app-student-list'
})
export class StudentList implements OnInit, AfterViewInit {

  @Input()
  school: School;

  @Input()
  department: Department;

  @Input()
  level: Level;

  @Input()
  speciality: Speciality;

  @Input()
  levelSpeciality: LevelSpeciality;

  @ViewChild('checkboxGroup')
  checkboxGroup: MsCheckboxGroup;

  @ViewChild('table')
  table: MsTable;

  @ViewChild(MsPaginator)
  paginator: MsPaginator<Student>;

  students: Array<Student> = [];
  filterValue: string = '';

  itemsFn: MsPaginatorItemsFn<Student> =
    (page: number, size: number) => Promise.resolve(this.items.slice(page * size, page * size + size));

  isLoading: boolean = true;
  isLoaded: boolean = false;

  constructor(private _studentLoader: StudentLoader,
              private _httpClient: StudentHttpClient,
              @Inject(STUDENT_SERVICE_TOKEN) public _studentService: IStudentService
  ) {
  }

  async ngOnInit() {
    try {
      await this.loadStudents();
      this.isLoading = false;
      this.isLoaded = true;
    } catch (e) {
      this.isLoading = false;
    }
  }

  ngAfterViewInit(): void {
    // this.checkboxGroup.change.subscribe(() => {
    //   console.log(this.checkboxGroup._checkboxChildren.filter(c => c.checked).map(c => c.value));
    //   // this.table.setVisibleColumns(this.checkboxGroup.values.toArray())
    // })
  }

  async loadStudents() {
    await this._studentLoader.loadBySchool(this.school);
    await this._studentLoader.loadByDepartment(this.department);
    await this._studentLoader.loadByLevel(this.level);
    await this._studentLoader.loadByLevelSpeciality(this.levelSpeciality);
    await this._studentLoader.loadBySpeciality(this.speciality);

    this.students = this.getStudents().sort((a, b) => a.fullName.localeCompare(b.fullName));
  }


  addStudent() {
    const options = new StudentAddOptions({
      school: this.school,
      department: this.department,
      level: this.level,
      speciality: this.speciality,
      levelSpeciality: this.levelSpeciality
    });

    this._studentService.addStudent(options);
  }

  delete(student: Student) {
    this._studentService.deleteStudent(student).then(deleted => {
      if (deleted) {
        this.table.remove(student);
      }
    });
  }

  getStudents(): Array<Student> {
    if (this.school) {
      return this.school.students?.toArray();
    }
    if (this.department) {
      return this.department.students?.toArray();
    } else if (this.level) {
      return this.level.students?.toArray();
    } else if (this.levelSpeciality) {
      return this.levelSpeciality.students?.toArray();
    }
    if (this.speciality) {
      return this.speciality.students?.toArray();
    }
  }

  search() {
    this.paginator.totalSize = this.items.length;
    this.paginator.reset(0);
  }


  getDepartment(): Department {
    if (this.department) {
      return this.department;
    }
    if (this.level) {
      return this.level.department;
    }
    if (this.levelSpeciality) {
      return this.levelSpeciality.level.department;
    }
  }

  get items(): Student[] {
    if (this.filterValue) {
      return this.students.filter(s =>
        s.fullName.toLocaleLowerCase().indexOf(this.filterValue.toLocaleLowerCase()) > -1
        || s.registrationId.toLocaleLowerCase().indexOf(this.filterValue.toLocaleLowerCase()) > -1);
    }
    return this.students.slice();
  }
}
