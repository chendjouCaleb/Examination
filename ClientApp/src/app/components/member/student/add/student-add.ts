import {StudentAddForm} from "examination/app/components/member/student/student-form";
import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {
  Level,
  LevelSpeciality,
  LevelSpecialityHttpClient,
  LevelSpecialityLoader,
  StudentHttpClient,
  StudentLoader
} from "src/models";
import {MsfModalRef} from "fabric-docs";

@Component({
  templateUrl: 'student-add.html'
})
export class StudentAdd implements OnInit {
  form: StudentAddForm;

  @Input()
  level: Level;

  @Input()
  levelSpeciality: LevelSpeciality;

  constructor(private _httpClient: StudentHttpClient,
              private _levelSpecialityHttpClient: LevelSpecialityHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _loader: StudentLoader,
              private _modalRef: MsfModalRef<StudentAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    if (!this.levelSpeciality) {
      await this._levelSpecialityLoader.loadByLevel(this.level);
    }
    this.form = new StudentAddForm(this.level, this.levelSpeciality);
  }

  async checkRegistrationId() {
    const registrationId = this.form.getControl("registrationId");
    if (registrationId.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const student = await this._httpClient.findByRegistrationId(this.level.department.school, registrationId.value);
      console.log(student);
      if (student && student.id) {
        registrationId.addError("Le matricule est déjà utilisé par un autre étudiant!");
      }
    }
  }


  async add() {
    const model = this.form.getModel();
    let student = await this._httpClient.addStudent(model.body, model.params);
    await this._loader.load(student);

    student.level = this.level;
    student.levelSpeciality = this.levelSpeciality;
    this.level.students.insert(0, student);
    this.levelSpeciality?.students.insert(0, student);
    this._alertEmitter.info(`L'étudiant ${student.fullName} a été ajouté!`);

    if (this._modalRef) {
      this._modalRef.close(student);
    }
  }

  cancel() {
    if (this._modalRef) {
      this._modalRef.close();
    }
  }
}

