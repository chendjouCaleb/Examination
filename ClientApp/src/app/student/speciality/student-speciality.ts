import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Speciality, SpecialityHttpClient, Student, StudentHttpClient, User} from "src/models";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'student-speciality.html'
})
export class StudentSpeciality implements OnInit{
  @Input()
  student: Student;

  specialities = new List<Speciality>();
  speciality: Speciality;

  constructor(private _httpClient: StudentHttpClient,
              private _specialityHttpClient: SpecialityHttpClient,
              private _dialogRef: MsfModalRef<StudentSpeciality>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit()  {
    this.specialities = await this._specialityHttpClient.listByExamination(this.student.examination);
  }


  async change() {
    await this._httpClient.changeSpeciality(this.student, this.speciality);
    this.student.speciality = this.speciality;
    this._alertEmitter.info(`L'étudiant ${this.student.fullName} a migré vers la spécialité ${this.speciality?.name}.`);
    this._dialogRef.close();
  }
}

