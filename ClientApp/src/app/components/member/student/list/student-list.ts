import {IStudentService, STUDENT_SERVICE_TOKEN} from '../student.service.interface';
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
import {Preference} from 'examination/infrastructure';
import {AlertEmitter} from 'examination/controls';

const columns = ['#', 'departmentName', 'levelIndex', 'specialityName', 'fullName', 'registrationId', 'birthDate', 'gender', 'user', 'registrationDate', 'addedBy', 'actions'];

@Component({
  templateUrl: 'student-list.html',
  selector: 'app-student-list'
})
export class StudentList implements OnInit, AfterViewInit {

  @Input()
  columnsKey = 'StudentListColumns';

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

  displayStyle: 'table' | 'grid' = 'grid';

  @Input()
  hiddenColumns: string[];
  private _visibleColumns: string[];
  get visibleColumns(): string[] {
    return this._visibleColumns;
  }

  set visibleColumns(values: string[]) {
    this._visibleColumns = values;
    this.preference.set(this.columnsKey, values, true);
  }

  constructor(private _studentLoader: StudentLoader,
              private _httpClient: StudentHttpClient,
              private preference: Preference,
              private alert: AlertEmitter,
              @Inject(STUDENT_SERVICE_TOKEN) public _studentService: IStudentService
  ) {
    this.displayStyle = this.preference.get('studentListDisplayMode') || 'grid';
  }

  async ngOnInit() {
    const savedColumns = this.preference.get(this.columnsKey);

    if (!savedColumns || savedColumns.length === 0) {
      const selectedColumns = columns.filter(c => !(this.hiddenColumns?.indexOf(c) > -1));
      console.log(selectedColumns)
      this._visibleColumns = selectedColumns;
    } else {
      this._visibleColumns = savedColumns;
    }


    try {
      await this.loadStudents();
      this.isLoading = false;
      this.isLoaded = true;
    } catch (e) {
      this.isLoading = false;
      this.alert.error(e.error.message);
    }
    this.alert.info('Chargement terminé !');
  }

  ngAfterViewInit(): void {
  }

  setDisplayStyle(model: 'table' | 'grid') {
    this.displayStyle = model;
    this.preference.set('studentListDisplayMode', model, true);
  }

  async loadStudents() {
    await this._studentLoader.loadBySchool(this.school);
    await this._studentLoader.loadByDepartment(this.department);
    await this._studentLoader.loadByLevel(this.level);
    await this._studentLoader.loadByLevelSpeciality(this.levelSpeciality);
    await this._studentLoader.loadBySpeciality(this.speciality);

    this.students = this.getStudents().sort((a, b) => a.fullName?.localeCompare(b.fullName));
  }

  slide() {
    this._studentService.slide(this.students)
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
