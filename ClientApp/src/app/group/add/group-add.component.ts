import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {
  Examination,
  GroupHttpClient,
  GroupLoader,
  Room,
  RoomHttpClient,
  Speciality,
  SpecialityHttpClient
} from "src/models";
import {GroupAddForm} from "../form";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'group-add.component.html'
})
export class GroupAddComponent implements OnInit{
  form = new GroupAddForm();

  @Input()
  examination: Examination;

  @Input()
  speciality: Speciality;

  rooms: List<Room>;
  room: Room;

  specialities: List<Speciality>;

  constructor(private _httpClient: GroupHttpClient,
              private _roomHttpClient: RoomHttpClient,
              private _specialityHttpClient: SpecialityHttpClient,
              private _loader: GroupLoader,
              private _dialogRef: MsfModalRef<GroupAddComponent>,
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

  async checkName() {
    const name = this.form.getControl("name");
    if (name.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const group = await this._httpClient.findByName(this.examination, name.value);
      if (group && group.id) {
        name.addError("Le nom est déjà utilisé par un autre groupe");
      }
    }
  }


  async add() {
    const formModel = this.form.getModel();
    const model = {name: formModel.name};
    let params: any = {
      examinationId: this.examination.id,
      roomId: formModel.room.id
    };
    if(formModel.speciality){
       params = {...params, specialityId : formModel.speciality?.id}
    }

    let group = await this._httpClient.add(model, params);
    await this._loader.load(group);
    this._alertEmitter.info(`Le groupe ${group.name} a été ajouté.`);
    this._dialogRef.close(group);
  }
}
