import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {LevelSpeciality, LevelSpecialityLoader, Student, StudentHttpClient} from "src/models";
import {MsfModalRef} from "fabric-docs";
import {AssertHelpers} from "@positon/collections/dist/helpers/assert-helpers";


@Component({
  templateUrl: 'student-speciality.html'
})
export class StudentSpeciality implements OnInit {
  @Input()
  student: Student;

  levelSpeciality: LevelSpeciality;

  constructor(private _httpClient: StudentHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _modalRef: MsfModalRef<StudentSpeciality>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit() {
    AssertHelpers.isNotNull(this.student);
    await this._levelSpecialityLoader.loadByLevel(this.student.level);
  }


  async change() {
    await this._httpClient.changeLevel(this.student, this.levelSpeciality.level, this.levelSpeciality);
    this.student.levelSpeciality?.students?.remove(this.student);

    this.student.levelSpeciality = this.levelSpeciality;

    this._alertEmitter.info(`L'étudiant ${this.student.fullName} a changé de spécialité.`);
    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }

  cancel() {
    if (this._modalRef) {
      this._modalRef.close(false);
    }
  }
}

