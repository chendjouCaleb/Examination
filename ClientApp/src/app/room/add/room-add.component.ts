import {Component, Input} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Organisation, RoomHttpClient, RoomLoader} from "src/models";
import {MatDialogRef} from "@angular/material/dialog";
import {RoomAddForm} from "../form";


@Component({
  templateUrl: 'room-add.component.html'
})
export class RoomAddComponent {
  form = new RoomAddForm();
  userId: string;

  @Input()
  organisation: Organisation;

  constructor(private _httpClient: RoomHttpClient, private _loader: RoomLoader,
              private _dialogRef: MatDialogRef<RoomAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async checkName() {
    const name = this.form.getControl("name");
    if (name.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const room = await this._httpClient.findByName(this.organisation, name.value);
      if (room && room.id) {
        name.addError("Le nom est déjà utilisé par une salle");
      }
    }
  }


  async add() {
    let room = await this._httpClient.add(this.form.getModel(), {organisationId: this.organisation.id});
    await this._loader.load(room);
    this._alertEmitter.info(`La salle ${room.name} a été ajoutée.`);
    this._dialogRef.close(room);
  }
}
