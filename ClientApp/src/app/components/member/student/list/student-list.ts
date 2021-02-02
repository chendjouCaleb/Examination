import {IStudentService, STUDENT_SERVICE_TOKEN} from '../student.service.interface';
import {AfterViewChecked, AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Department, Level, LevelSpeciality, Student, StudentHttpClient, StudentLoader} from 'examination/models';
import {List} from '@positon/collections';
import {MsfCheckboxGroup, MsfMenu} from "fabric-docs";
import {MsTable} from "@ms-fluent/table";

@Component({
  templateUrl: 'student-list.html',
  selector: 'app-student-list'
})
export class StudentList implements OnInit, AfterViewInit {

  @Input()
  department: Department;

  @Input()
  level: Level;

  @Input()
  levelSpeciality: LevelSpeciality;

  @ViewChild('checkboxGroup')
  checkboxGroup: MsfCheckboxGroup;

  @ViewChild('table')
  table: MsTable;

  students: Array<Student> = [];

  constructor(private _studentLoader: StudentLoader,
              private _httpClient: StudentHttpClient,
              @Inject(STUDENT_SERVICE_TOKEN) public _studentService: IStudentService
  ) {
  }

  async ngOnInit() {
    await this._studentLoader.loadByDepartment(this.department);
    await this._studentLoader.loadByLevel(this.level);
    await this._studentLoader.loadByLevelSpeciality(this.levelSpeciality);

    this.students = this.getStudents();
  }

  ngAfterViewInit(): void {
      this.checkboxGroup.change.subscribe(() => {
        console.log(this.checkboxGroup._checkboxChildren.filter(c => c.checked).map(c => c.value));
        //this.table.setVisibleColumns(this.checkboxGroup.values.toArray())
      })
  }


  addStudent() {
    this._studentService.addStudent(this.level, this.levelSpeciality);
  }

  delete(student: Student) {
    this._studentService.deleteStudent(student);
  }

  getStudents(): Array<Student> {
    if (this.department) {
      return this.department.students?.toArray();
    } else if (this.level) {
      return this.level.students?.toArray();
    } else if (this.levelSpeciality) {
      return this.levelSpeciality.students?.toArray();
    }
  }



}
