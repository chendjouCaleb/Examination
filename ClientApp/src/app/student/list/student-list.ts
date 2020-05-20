import {AfterViewInit, Component, Input, NgZone, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Examination, Student, StudentHttpClient, StudentLoader, Speciality, Group} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfCheckbox, MsfMenuItemCheckbox, MsfModal} from "fabric-docs";
import {StudentAddComponent} from '../add/student-add.component';
import {StudentEditComponent} from "examination/app/student/edit/student-edit.component";


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

  students: List<Student>;

  constructor(private currentItems: CurrentItems, private _studentLoader: StudentLoader,
              private _httpClient: StudentHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _ngZone: NgZone,
              private _dialog: MsfModal) {

  }

  async ngOnInit() {
    let students: List<Student>;
    if (this.examination) {
      students = await this._httpClient.listByExamination(this.examination);
    } else if (this.speciality) {
      students = await this._httpClient.listBySpeciality(this.speciality);
    } else if (this.group) {
      students = await this._httpClient.listByGroup(this.group);
    }
    await this._studentLoader.loadAll(students);
    this.students = students;

  }

  openAddStudentDialog() {
    const modalRef = this._dialog.open(StudentAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.componentInstance.speciality = this.speciality;
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.students.insert(0, result);
      }
    });
  }


  delete(student: Student) {
    const result = this._confirmation.open('Voulez-vous Supprimer cet étudiant?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(student.id);
      this.students.remove(student);
      this._alertEmitter.info('L\'étudiant a été supprimé!');
    });
  }

  columns = List.fromArray(["#", 'index', 'name', 'registrationId', 'speciality', 'gender', 'group', 'action']);

  @ViewChildren(MsfMenuItemCheckbox, {read: MsfCheckbox})
  menuCheckbox: QueryList<MsfCheckbox>;

  columnCheckbox: MsfCheckbox[] = [];

  canShow(column: string): boolean {
    return this.columns.contains(column);
  }

  columnState(column: string, state: boolean){
    if(state && !this.columns.contains(column)) {
      this.columns.add(column);
    }

    if(!state && this.columns.contains(column)) {
      this.columns.remove(column);
    }
  }

  ngAfterViewInit(): void {
    this.columnCheckbox = this.menuCheckbox.filter(item => item.name === 'column');
    Promise.resolve().then(() => {
      this.columnCheckbox.forEach(item => {
        item.checked = this.canShow(item.value);
        item.change.subscribe(() => this.columnState(item.value, item.checked));
      });

    })
  }


  edit(student: Student) {
    const modal = this._dialog.open(StudentEditComponent, {disableClose: false});
    modal.componentInstance.student = student;
  }
}
