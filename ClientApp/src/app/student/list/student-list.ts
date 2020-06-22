import {AfterViewInit, Component, Input, NgZone, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Examination, Student, StudentHttpClient, StudentLoader, Speciality, Group} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfCheckbox, MsfMenuItemCheckbox, MsfModal} from "fabric-docs";
import {StudentAddComponent} from '../add/student-add.component';
import {StudentService} from "examination/app/student/student.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NewStudent} from "examination/app/student/new-student";
import {StudentHub} from "examination/app/student/student-hub";
import {PartialObserver} from "rxjs";
import {SpecialityService} from "examination/app/speciality";


@Component({
  templateUrl: 'student-list.html',
  selector: 'app-student-list'
})
export class StudentList implements OnInit, AfterViewInit {


  @Input()
  examination: Examination;

  @Input()
  speciality: Speciality;

  @Input()
  group: Group;

  /** Indique si la propriété examination a été renseignée */
  isExamination: boolean = false;

  get isSpeciality(): boolean {
    return !this.isExamination;
  }

  students: List<Student>;

  constructor(private currentItems: CurrentItems, private _studentLoader: StudentLoader,
              private _httpClient: StudentHttpClient,
              public _studentService: StudentService,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _snackbar: MatSnackBar,
              private _specialityService: SpecialityService,
              private _hub: StudentHub,
              private _dialog: MsfModal) {
  }

  async ngOnInit() {
    let students: List<Student>;
    if (this.examination) {
      this.isExamination = true;
      students = await this._httpClient.listByExamination(this.examination);
    } else if (this.speciality) {
      students = await this._httpClient.listBySpeciality(this.speciality);
    } else if (this.group) {
      students = await this._httpClient.listByGroup(this.group);
    }
    await this._studentLoader.loadAll(students);
    this.students = students;

    this._hub.studentDeleted.subscribe(student => {
      this.students.removeIf(s => s.id === student.id);
      if (student.examinationId === this.examination.id) {
        this._alertEmitter.error(`L'étudiant ${student.fullName} a été supprimé!`);
      }
    });

    this._hub.studentCreated.subscribe(this.onStudentCreated);
  }

  onStudentCreated = async student => {
    if (student.examinationId === this.getExamination().id) {
      await this._studentLoader.load(student);
      this._alertEmitter.error(`L'étudiant ${student.fullName} a été supprimé!`);
      this._snackbar.openFromComponent(NewStudent, {
        panelClass: ['mat-snackbar-panel'],
        data: {'student': student},
        horizontalPosition: "right", verticalPosition: "bottom"
      });
    }

    if (this.speciality && student.specialityId === this.speciality.id) {
      this.students.insert(0, student);
    } else if (student.examinationId === this.examination.id) {
      this.students.insert(0, student);
    }
  };

  groupSpecialityStudents() {
    this._specialityService.group(this.speciality).then(async () => {
      const students = await this._httpClient.listBySpeciality(this.speciality);
      await this._studentLoader.loadAll(students);
      this.students = students;
    })
  }

  ungroupSpecialityStudents() {
    this._specialityService.ungroup(this.speciality).then(async () => {
      this.students.forEach(student => {
        student.groupIndex = 0;
        student.groupId = null;
        student.group = null;
      })
    })
  }



  openAddStudentDialog() {
    const modalRef = this._dialog.open<StudentAddComponent, Student>(StudentAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.componentInstance.speciality = this.speciality;
  }

  get _examination(): Examination {
    if (this.examination) {
      return this.examination;
    }
    return this.speciality.examination;
  }


  delete(student: Student) {
    const result = this._confirmation.open('Voulez-vous Supprimer cet étudiant?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(student.id);
      this.students.remove(student);
      this._alertEmitter.info('L\'étudiant a été supprimé!');
    });
  }

  columns = new List<string>();

  @ViewChildren(MsfMenuItemCheckbox, {read: MsfCheckbox})
  menuCheckbox: QueryList<MsfCheckbox>;

  columnCheckbox: MsfCheckbox[] = [];

  canShow(column: string): boolean {
    return this.columns.contains(column);
  }

  columnState(column: string, state: boolean) {
    if (state && !this.columns.contains(column)) {
      this.columns.add(column);
    }

    if (!state && this.columns.contains(column)) {
      this.columns.remove(column);
    }
    localStorage.setItem("userListColumns", JSON.stringify(this.columns.toArray()));
  }

  ngAfterViewInit(): void {
    this.loadColumn();
    this.columnCheckbox = this.menuCheckbox.filter(item => item.name === 'column');
    Promise.resolve().then(() => {
      this.columnCheckbox.forEach(item => {
        item.checked = this.canShow(item.value);
        item.change.subscribe(() => this.columnState(item.value, item.checked));
      });

    })
  }

  loadColumn() {
    const defaultColumns = ["#", 'index', 'name', 'registrationId', 'speciality', 'gender', 'group', 'action'];
    const columns = localStorage.getItem("userListColumns");
    if (columns) {
      this.columns = List.fromArray(JSON.parse(columns))
    } else {
      localStorage.setItem("userListColumns", JSON.stringify(defaultColumns));
      this.columns = List.fromArray(defaultColumns)
    }
  }

  getExamination(): Examination {
    if (this.examination) {
      return this.examination;
    }
    return this.speciality.examination;
  }

}
