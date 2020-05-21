import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {
  Examination,
  StudentHttpClient,
  StudentLoader,
  Room,
  RoomHttpClient,
  Speciality,
  SpecialityHttpClient
} from "src/models";
import {StudentAddForm} from "../form";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'student-add.component.html'
})
export class StudentAddComponent implements OnInit{
  form = new StudentAddForm();

  @Input()
  examination: Examination;

  @Input()
  speciality: Speciality;

  rooms: List<Room>;
  room: Room;

  specialities: List<Speciality>;

  constructor(private _httpClient: StudentHttpClient,
              private _roomHttpClient: RoomHttpClient,
              private _specialityHttpClient: SpecialityHttpClient,
              private _loader: StudentLoader,
              private _dialogRef: MsfModalRef<StudentAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    if(this.speciality){
      this.examination = this.speciality.examination;
      this.form.getControl("speciality").setValue(this.speciality);
    }else {
      this.specialities = await this._specialityHttpClient.listByExamination(this.examination);
    }
    this.rooms = await this._roomHttpClient.listByOrganisation(this.examination.organisation);

  }

  async checkRegistrationId() {
    const registrationId = this.form.getControl("registrationId");
    if (registrationId.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const student = await this._httpClient.findByRegistrationId(this.examination, registrationId.value);
      if (student && student.id) {
        registrationId.addError("Le nom est déjà utilisé par un autre élève");
      }
    }
  }


  async add() {
    const model = this.form.getModel();

    let student = await this._httpClient.add(model.body, {...model.params, examinationId: this.examination.id});
    await this._loader.load(student);
    this._alertEmitter.info(`L'étudiant  ${student.fullName} a été ajouté.`);
    this._dialogRef.close(student);
  }
}

